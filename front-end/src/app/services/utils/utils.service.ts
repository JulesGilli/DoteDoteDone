import { inject, Injectable, signal } from '@angular/core';
import { Board, Card, List, Workspace } from '../../models';
import { GetService } from '../crud/get/get.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly _getService = inject(GetService);

  workspaces = signal<Workspace[]>([]);
  selectedWorkspace = signal<Workspace | null>(null);

  boards = signal<Board[]>([]);
  selectedBoard = signal<Board | null>(null);
  allBoards = signal<Record<string, Board[]>>({});

  lists = signal<Record<string, List[]>>({});

  tickets = signal<Card[]>([]);

  public loadWorkspaces(): void {
    this._getService.getAllWorkspace().subscribe((data: Workspace[]) => {
      this.workspaces.set(data);
      if (this.workspaces().length > 0) {
        this.setWorkspace(data[0]);
      }
    });
  }

  public setWorkspace(workspace: Workspace) {
    this.selectedWorkspace.set(workspace);
    this.loadBoards();
  }

  public loadBoards(): void {
    if (this.selectedWorkspace()) {
      if (!this.allBoards()[this.selectedWorkspace()!.id]) {
        this._getService
          .getAllBoards({ organizations: this.selectedWorkspace()!.id })
          .subscribe((data: Board[]) => {
            this.boards.set(data);
            if (this.boards().length > 0) {
              this.setBoard(data[0]);
            }
          });
      } else {
        this.boards.set(this.allBoards()[this.selectedWorkspace()!.id]);
        if (this.boards().length > 0) {
          this.setBoard(this.boards()[0]);
        }
      }
    }
  }

  public setBoard(board: Board) {
    this.selectedBoard.set(board);
    this.loadListsWithCards();
  }

  public loadListsWithCards(): void {
    if (this.selectedBoard()) {
      if (!this.lists()[this.selectedBoard()!.id]) {
        this._getService
          .getAllLists({ boards: this.selectedBoard()!.id })
          .subscribe((lists: List[]) => {
            this.lists.update((prevLists) => ({
              ...prevLists,
              [this.selectedBoard()!.id]: lists,
            }));

            this._getService
              .getAllCards({ boards: this.selectedBoard()!.id })
              .subscribe((cards: Card[]) => {
                this.tickets.set(cards);
              });
          });
      } else {
      }
    }
  }

  public getAllListsInArray(): List[] {
    return Object.values(this.lists()).flat();
  }

  public getAllListFromBoard(boardId: string) {
    this;
  }
}
