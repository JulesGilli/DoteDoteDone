import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { SharedModule } from '../../../shared.module';
import { Workspace, Board, Card } from '../../models';
import { GetService } from '../../services';
import { forkJoin } from 'rxjs';
import { ModalCreateComponent } from '../../components/modal-create/modal-create.component';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  standalone: true,
  imports: [
    SharedModule,
    CardComponent,
    ModalCreateComponent,
  ],
  styleUrls: ['./all-cards.component.scss'],
})
export class AllCardsComponent implements OnInit {
  private _getService = inject(GetService);

  selectedWorkspace!: Workspace;
  workspaces: Workspace[] = [];
  boards: Board[] = [];

  selectedTicket: any = null;

  isEditMode: boolean = false;
  isCreateMode: boolean = false;
  tickets: any[] = [];

  ngOnInit(): void {
    this._getService.getAllWorkspace().subscribe((data: Workspace[]) => {
      this.workspaces = data;
      if (this.workspaces.length > 0) {
        this.selectedWorkspace = this.workspaces[0];
        this.loadCards();
      }
    });
  }

  loadCards(): void {
    if (!this.selectedWorkspace) {
      return;
    }
    this._getService
      .getAllBoards({ organizations: this.selectedWorkspace.id })
      .subscribe((boards: Board[]) => {
        if (!boards || boards.length === 0) {
          this.tickets = [];
          return;
        }
        this.boards = boards;
        const cardsObservables = boards.map((board) =>
          this._getService.getAllCards({ boards: board.id })
        );
        forkJoin(cardsObservables).subscribe((cardsArrays: Card[][]) => {
          const allCards = ([] as Card[]).concat(...cardsArrays);
          this.tickets = allCards.map((card) => ({
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
}
