import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalViewComponent } from '../../components/modal-view/modal-view.component';
import { ModalEditComponent } from '../../components/modal-edit/modal-edit.component';
import { ModalCreateComponent } from '../../components/modal-create/modal-create.component';
import { Workspace, Board, Card } from '../../models';
import { GetService, PostService } from '../../services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    NgIf,
    FormsModule,
    //ModalViewComponent,
    //ModalEditComponent,
    ModalCreateComponent,
  ],
  styleUrls: ['./all-cards.component.scss'],
})
export class AllCardsComponent {
  private _getService = inject(GetService);
  private _postService = inject(PostService);

  selectedWorkspace!: string | undefined;
  workspaces: Workspace[] = [];

  selectedTicket: any = null;
  isEditMode: boolean = false;
  isCreateMode: boolean = false;
  tickets: any[] = [];

  availableBoards: Board[] = [];

  ngOnInit() {
    this._getService.getAllWorkspace().subscribe((data: Workspace[]) => {
      this.workspaces = data;
      if (this.workspaces.length > 0) {
        this.selectedWorkspace = this.workspaces[0].id;
        this.loadBoardsAndCards();
      }
    });
  }

  loadBoardsAndCards() {
    if (!this.selectedWorkspace) {
      return;
    }
    this._getService.getAllBoards({ organizations: this.selectedWorkspace })
        .subscribe((boards: Board[]) => {
          this.availableBoards = boards;
          if (!boards || boards.length === 0) {
            this.tickets = [];
            return;
          }
          const cardsObservables = boards.map(board =>
              this._getService.getAllCards({ boards: board.id })
          );
          forkJoin(cardsObservables).subscribe((cardsArrays: Card[][]) => {
            const allCards = ([] as Card[]).concat(...cardsArrays);
            this.tickets = allCards.map(card => ({
              titre: card.name,
              resume: card.desc,
              statusCard: 'normal',
              ticketId: card.id,
              manager: card.idMembers && card.idMembers.length > 0 ? card.idMembers[0] : 'unknown',
            }));
          });
        });
  }


  onWorkspaceChange() {
    this.loadCards();
  }

  loadCards() {
    if (!this.selectedWorkspace) {
      return;
    }
    this._getService.getAllBoards({ organizations: this.selectedWorkspace })
        .subscribe((boards: Board[]) => {
          if (!boards || boards.length === 0) {
            this.tickets = [];
            return;
          }
          const cardsObservables = boards.map(board =>
              this._getService.getAllCards({ boards: board.id })
          );
          forkJoin(cardsObservables).subscribe((cardsArrays: Card[][]) => {
            const allCards = ([] as Card[]).concat(...cardsArrays);
            this.tickets = allCards.map(card => ({
              titre: card.name,
              resume: card.desc,
              statusCard: 'normal',
              ticketId: card.id,
              manager:
                  card.idMembers && card.idMembers.length > 0
                      ? card.idMembers[0]
                      : 'unknown',
            }));
          });
        });
  }

  onCreateTicket(newTicket: any) {
    const payload = {
      name: newTicket.titre,
      desc: newTicket.resume,
      idList: this.getIdListFromBoard(newTicket.board),
    };

    this._postService.postCard(payload).subscribe((card: Card) => {
      const ticket = {
        titre: card.name,
        resume: card.desc,
        statusCard: newTicket.statusCard,
        ticketId: card.id,
        manager: newTicket.manager,
        board: newTicket.board,
        workspace: newTicket.workspace,
      };
      this.tickets.push(ticket);
      this.closeCreateModal();
    });
  }

  openModal(ticket: any) {
    this.selectedTicket = ticket;
    this.isEditMode = false;
  }

  closeModal() {
    this.selectedTicket = null;
    this.isEditMode = false;
  }

  switchToEdit() {
    this.isEditMode = true;
  }

  openCreateModal() {
    this.isCreateMode = true;
    this.selectedTicket = null;
  }

  closeCreateModal() {
    this.isCreateMode = false;
  }

  getIdListFromBoard(boardName: string): string {
    return 'votre_idList_par_defaut';
  }
}
