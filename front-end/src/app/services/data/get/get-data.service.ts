import { inject, Injectable } from '@angular/core';
import { GetService } from '../../crud/get/get.service';
import { Board, Card, List, Workspace } from '../../../models';
import { DataService } from '../data.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  readonly _getService = inject(GetService);
  readonly _dataService = inject(DataService);

  public loadWorkspaces(): void {
    this._dataService.loading.set(true);

    this._getService.getAllWorkspace().subscribe((data: Workspace[]) => {
      this._dataService.workspaces.set(data);
      if (this._dataService.workspaces().length > 0) {
        this.setWorkspace(data[0]);
      }
      this._dataService.loading.set(false);
    });
  }

  public setWorkspace(workspace: Workspace) {
    this._dataService.selectedWorkspace.set(workspace);
    this.loadBoards();
  }

  public loadBoards(): void {
    this._dataService.loading.set(true);
    if (this._dataService.selectedWorkspace()) {
      if (
        !this._dataService.allBoards()[
          this._dataService.selectedWorkspace()!.id
        ]
      ) {
        this._getService
          .getAllBoards({
            organizations: this._dataService.selectedWorkspace()!.id,
          })
          .subscribe((data: Board[]) => {
            this._dataService.boards.set(data);
            if (this._dataService.boards().length > 0) {
              this.setBoard(data[0]);
            }
            this._dataService.loading.set(false);
          });
      } else {
        this._dataService.boards.set(
          this._dataService.allBoards()[
            this._dataService.selectedWorkspace()!.id
          ]
        );
        if (this._dataService.boards().length > 0) {
          this.setBoard(this._dataService.boards()[0]);
        }
        this._dataService.loading.set(false);
      }
    }
  }

  public setBoard(board: Board) {
    this._dataService.selectedBoard.set(board);
    this.loadListsWithCards();
  }

  public loadListsWithCards(): void {
    if (this._dataService.selectedBoard()) {
      this._dataService.loading.set(true);
      if (!this._dataService.lists()[this._dataService.selectedBoard()!.id]) {
        this._getService
          .getAllLists({ boards: this._dataService.selectedBoard()!.id })
          .subscribe((lists: List[]) => {
            let listsNotClosed: List[] = lists.filter((l) => !l.closed);
            this._dataService.lists.update((prevLists) => ({
              ...prevLists,
              [this._dataService.selectedBoard()!.id]: listsNotClosed,
            }));

            this._getService
              .getAllCards({ boards: this._dataService.selectedBoard()!.id })
              .subscribe((cards: Card[]) => {
                let cardsNotClosed = cards.filter((c) => !c.closed);
                this._dataService.allTickets()[
                  this._dataService.selectedBoard()!.id
                ] = cardsNotClosed;
                this._dataService.tickets.set(cardsNotClosed);
                this._dataService.loading.set(false);
              });
          });
      } else {
        this._dataService.tickets.set(
          this._dataService.allTickets()[this._dataService.selectedBoard()!.id]
        );
        this._dataService.loading.set(false);
      }
    }
  }

  public getAllListsInArray(): List[] {
    return Object.values(
      this._dataService.lists()[this._dataService.selectedBoard()!.id]
    ).flat();
  }
}
