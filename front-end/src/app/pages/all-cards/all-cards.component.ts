import { Component, inject, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CardComponent } from '../../components/card/card.component';
import { SharedModule } from '../../../shared.module';
import { Workspace, Board, Card, Member } from '../../models';
import { GetService } from '../../services';
import { forkJoin, lastValueFrom } from 'rxjs';
import { ModalCreateComponent } from '../../components/modal-create/modal-create.component';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  standalone: true,
  imports: [SharedModule, CardComponent, ModalCreateComponent],
  styleUrls: ['./all-cards.component.scss'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AllCardsComponent implements OnInit {
  private _getService = inject(GetService);

  isEditMode: boolean = false;
  isCreateMode: boolean = false;
  loading: boolean = true;
  error: any = null;

  selectedWorkspace!: Workspace;
  workspaces: Workspace[] = [];
  boards: Record<string, Board[]> = {};

  allTickets: Record<string, Card[]> = {};
  tickets: any[] = [];
  selectedTicket: any = null;

  membersFromTicket: Record<string, string> = {};

  ngOnInit(): void {
    this.loading = true;
    this._getService.getAllWorkspace().subscribe({
      next: (data: Workspace[]) => {
        this.workspaces = data;
        if (this.workspaces.length > 0) {
          this.selectedWorkspace = this.workspaces[0];
          this.loadCards();
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.error = err;
        this.loading = false;
      }
    });
  }

  loadCards(): void {
    if (!this.selectedWorkspace) {
      return;
    }
    this.loading = true;
    if (!this.boards[this.selectedWorkspace.id]) {
      this._getService.getAllBoards({ organizations: this.selectedWorkspace.id }).subscribe({
        next: (boards: Board[]) => {
          if (!boards || boards.length === 0) {
            this.loading = false;
            return;
          }
          this.boards[this.selectedWorkspace.id] = boards;
          console.log(boards);
          this.loadCardsFromBoard(boards);
        },
        error: (err) => {
          console.error(err);
          this.error = err;
          this.loading = false;
        }
      });
    } else {
      this.tickets = this.formatOfTickets(this.allTickets[this.selectedWorkspace.id]);
      this.loading = false;
    }
  }

  loadCardsFromBoard(boards: Board[]) {
    const cardsObservables = boards.map((board) =>
      this._getService.getAllCards({ boards: board.id })
    );
    forkJoin(cardsObservables).subscribe({
      next: (cardsArrays: Card[][]) => {
        const allCards = ([] as Card[]).concat(...cardsArrays);
        this.allTickets[this.selectedWorkspace.id] = allCards;
        this.tickets = this.formatOfTickets(allCards);
        console.log(allCards);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = err;
        this.loading = false;
      }
    });
  }

  formatOfTickets(cards: Card[]) {
    const tickets = cards.map((card) => {
      const ticket = {
        titre: card.name,
        resume: card.desc,
        statusCard: 'normal',
        ticketId: card.id,
        manager: 'No one',
      };

      if (card.idMembers && card.idMembers.length > 0) {
        if (!this.membersFromTicket[card.idMembers[0]]) {
          this.getMembers(card.idMembers[0]).then((name) => {
            ticket.manager = name;
          });
        } else {
          ticket.manager = this.membersFromTicket[card.idMembers[0]];
        }
      }

      return ticket;
    });
    return tickets;
  }

  async getMembers(idMember: string): Promise<string> {
    if (this.membersFromTicket[idMember]) {
      return this.membersFromTicket[idMember];
    } else {
      const data = await lastValueFrom(
        this._getService.getMemberById(idMember)
      );
      return data.fullName;
    }
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
