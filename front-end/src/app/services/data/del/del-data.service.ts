import { inject, Injectable } from '@angular/core';
import { DeleteService } from '../../crud/delete/delete.service';
import { Board, Card, List, Workspace } from '../../../models';
import { DataService } from '../data.service';
import { GetDataService } from '../get/get-data.service';

@Injectable({
  providedIn: 'root',
})
export class DelDataService {
  private readonly _dataService = inject(DataService);
  private readonly _delService = inject(DeleteService);
  private _getDataService = inject(GetDataService);

  deleteList(list: List) {
    if (list.name === 'default') {
      return;
    } else {
      if (this._dataService.selectedBoard()) {
        if (
          this._dataService.allTickets()[this._dataService.selectedBoard()!.id]
        ) {
          let cardsToBeDel: Card[] = this._dataService
            .allTickets()
            [
              this._dataService.selectedBoard()!.id
            ].filter((card) => card.idList === list.id);

          cardsToBeDel.forEach((card) => {
            this._delService.deleteCard(card.id).subscribe();
          });

          if (cardsToBeDel.length !== 0) {
            this._dataService.allTickets.update((prev) => {
              return {
                ...prev,
                [this._dataService.selectedBoard()!.id]: prev[
                  this._dataService.selectedBoard()!.id
                ].filter((card) => card.idList !== list.id),
              };
            });
          }
        }

        this._dataService.lists.update((prev) => {
          return {
            ...prev,
            [this._dataService.selectedBoard()!.id]: prev[
              this._dataService.selectedBoard()!.id
            ].filter((l) => l.id !== list.id),
          };
        });
        this._delService.deleteList(list.id).subscribe();
      }
    }
  }

  deleteBoard(boardId: string) {
    this._delService.deleteBoard(boardId);
    this._dataService.allTickets.update((tickets) => {
      const updatedTickets = { ...tickets };
      delete updatedTickets[boardId];
      return updatedTickets;
    });

    this._dataService.lists()[boardId].forEach((l) => {
      this.deleteList(l);
    });
    this._dataService.allBoards.update((prev) => {
      return {
        ...prev,
        [this._dataService.selectedWorkspace()!.id]: prev[
          this._dataService.selectedWorkspace()!.id
        ].filter((b) => boardId !== b.id),
      };
    });
    this._getDataService.loadBoards();
  }

  deleteWorkspace(workspaceId: string) {
    this._delService.deleteWorkspace(workspaceId).subscribe();
    this._dataService
      .allBoards()
      [workspaceId].forEach((b) => this.deleteBoard(b.id));
    let workspaces: Workspace[] = this._dataService
      .workspaces()
      .filter((w) => w.id !== workspaceId);
    this._dataService.workspaces.set(workspaces);
    this._getDataService.loadWorkspaces();
  }
}
