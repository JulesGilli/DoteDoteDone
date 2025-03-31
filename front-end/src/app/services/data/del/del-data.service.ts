import { inject, Injectable } from '@angular/core';
import { DeleteService } from '../../crud/delete/delete.service';
import {Board, Card, List, Workspace} from '../../../models';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root',
})
export class DelDataService {
  private readonly _dataService = inject(DataService);
  private readonly _delService = inject(DeleteService);

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

  deleteBoard(board: Board) {
    this._delService.deleteBoard(board.id).subscribe();
  }

  deleteWorkspace(workspace: Workspace) {
    this._delService.deleteWorkspace(workspace.id).subscribe();
  }
}
