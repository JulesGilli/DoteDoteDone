import { inject, Injectable, signal } from '@angular/core';
import { Board, Card, List, Workspace } from '../../models';
import { GetService } from '../crud/get/get.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private readonly _getService = inject(GetService);

  loading = signal<boolean>(true);

  workspaces = signal<Workspace[]>([]);
  selectedWorkspace = signal<Workspace | null>(null);

  boards = signal<Board[]>([]);
  selectedBoard = signal<Board | null>(null);

  lists = signal<List[]>([]);

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
      this._getService.getAllBoards({ organizations: this.selectedWorkspace()!.id }).subscribe((data: Board[]) => {
        this.boards.set(data);
        if (this.boards().length > 0) {
          this.setBoard(data[0]);
        }
      });
    }
  }

  public setBoard(board: Board) {
    this.selectedBoard.set(board);
    this.loadListsWithCards();
  }

  public loadListsWithCards(): void {
    if (this.selectedBoard()) {
      this._getService.getAllLists({ boards: this.selectedBoard()!.id }).subscribe((lists: List[]) => {
        this.lists.set(lists);

        this._getService.getAllCards({ boards: this.selectedBoard()!.id }).subscribe((cards: Card[]) => {
          this.tickets.set(cards);
        });
      });
    }

    this.loading.set(false);
  }
}
