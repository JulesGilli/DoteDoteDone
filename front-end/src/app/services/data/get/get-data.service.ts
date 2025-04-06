import { inject, Injectable } from '@angular/core';
import { GetService } from '../../crud/get/get.service';
import { Board, Card, List, Workspace } from '../../../models';
import { DataService } from '../data.service';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  readonly _getService = inject(GetService);
  readonly _dataService = inject(DataService);

  public async loadWorkspaces(): Promise<Workspace[]> {
    this._dataService.loading.set(true);

    const data = await lastValueFrom(this._getService.getAllWorkspace());
    this._dataService.workspaces.set(data);
    if (this._dataService.workspaces().length > 0) {
      this.setWorkspace(data[0]);
    }
    this._dataService.loading.set(false);
    return data;
  }

  public async setWorkspace(workspace: Workspace): Promise<boolean> {
    this._dataService.selectedWorkspace.set(workspace);
    if (workspace.id === 'all') {
      for (const w of this._dataService.workspaces()) {
        await this.setWorkspace(w);
      }
      return false;
    } else {
      return await this.loadBoards();
    }
  }

  public async loadBoards(): Promise<boolean> {
    this._dataService.loading.set(true);
    const selectedWs = this._dataService.selectedWorkspace();
    if (!selectedWs) return false;

    if (!this._dataService.allBoards()[selectedWs.id]) {
      try {
        const boards: Board[] = await lastValueFrom(
          this._getService.getAllBoards({ organizations: selectedWs.id })
        );
        const boardsNotClosed = boards.filter((b) => !b.closed);
        this._dataService.allBoards()[selectedWs.id] = boardsNotClosed;
        this._dataService.boards.set(boardsNotClosed);
        if (boardsNotClosed.length > 0) {
          await this.setBoard(boardsNotClosed[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this._dataService.loading.set(false);
      }
      return true;
    } else {
      const boards = this._dataService.allBoards()[selectedWs.id];
      this._dataService.boards.set(boards);
      if (boards.length > 0) {
        await this.setBoard(boards[0]);
      }
      this._dataService.loading.set(false);
      return true;
    }
  }

  public async setBoard(board: Board): Promise<Card[]> {
    this._dataService.selectedBoard.set(board);
    return await this.loadListsWithCards();
  }

  public async loadAll(): Promise<void> {
    this._dataService.loading.set(true);
    await this.loadWorkspaces();
    await this.loadBoards();
    await this.loadListsWithCards();
    this._dataService.loading.set(false);
  }

  public loadListsWithCards(): Promise<Card[]> {
    if (!this._dataService.selectedBoard()) return Promise.resolve([]);

    this._dataService.loading.set(true);
    const boardId = this._dataService.selectedBoard()!.id;

    return new Promise((resolve) => {
      if (!this._dataService.lists()[boardId]) {
        this._getService
          .getAllLists({ boards: boardId })
          .subscribe((lists: List[]) => {
            let listsNotClosed: List[] = lists.filter((l) => !l.closed);
            this._dataService.lists.update((prevLists) => ({
              ...prevLists,
              [boardId]: listsNotClosed,
            }));

            this._getService
              .getAllCards({ boards: boardId })
              .subscribe((cards: Card[]) => {
                let cardsNotClosed = cards.filter((c) => !c.closed);
                this._dataService.allTickets.update((prev) => ({
                  ...prev,
                  [boardId]: cardsNotClosed,
                }));

                this._dataService.tickets.set(cardsNotClosed);
                this._dataService.loading.set(false);
                resolve(cardsNotClosed);
              });
          });
      } else {
        const tickets = this._dataService.allTickets()[boardId] || [];
        this._dataService.tickets.set(tickets);
        this._dataService.loading.set(false);
        resolve(tickets);
      }
    });
  }

  public getAllListsInArray(): List[] {
    if (
      this._dataService.selectedBoard() &&
      this._dataService.lists()[this._dataService.selectedBoard()!.id]
    )
      return Object.values(
        this._dataService.lists()[this._dataService.selectedBoard()!.id]
      ).flat();
    return [];
  }

  addListToBoard(list: List): void {
    const boardId = list.idBoard;
    this._dataService.lists.update((prev) => {
      const updatedLists = [...(prev[boardId] || []), list];
      return {
        ...prev,
        [boardId]: updatedLists,
      };
    });
  }

}
