import { Component, inject, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CardComponent } from '../../components/card/card.component';
import { SharedModule } from '../../../shared.module';
import { Workspace, Board, Card } from '../../models';
import {
  GetDataService,
  GetService,
  PostService,
  PutService,
} from '../../services';
import { forkJoin, lastValueFrom, map } from 'rxjs';
import { ModalCreateComponent } from '../../components/modal-create/modal-create.component';
import { ModalEditComponent } from '../../components/modal-edit/modal-edit.component';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  standalone: true,
  imports: [
    SharedModule,
    ModalCreateComponent,
    ModalEditComponent,
    CardComponent
  ],
  styleUrls: ['./all-cards.component.scss'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AllCardsComponent implements OnInit {
  private _getService = inject(GetService);
  private _postService = inject(PostService);
  private _putService = inject(PutService);
   _getDataService = inject(GetDataService);

  _dataService = inject(DataService);

  isEditMode: boolean = false;
  isCreateMode: boolean = false;
  loading: boolean = true;
  error: any = null;

  selectedWorkspace!: Workspace;
  workspaces: Workspace[] = [];

  allTickets: Record<string, Card[]> = {};
  tickets: any[] = [];
  selectedTicket: any = null;

  membersFromTicket: Record<string, string> = {};

  ngOnInit(): void {
    this.loading = true;

    this._getDataService.loadWorkspaces().then((data) => {
      const allCardsOption: Workspace = {
        id: 'all',
        displayName: 'All Tickets',
      } as Workspace;
      this.workspaces = [allCardsOption, ...data];
      this.selectedWorkspace = this.workspaces[0];
      this._getDataService.setWorkspace(this.selectedWorkspace).then(() => {
        this.loadCards();
      });
    });
  }

  async loadCards() {
    const allBoards = Object.values(this._dataService.allBoards());
    if (allBoards.length === 0) {
      setTimeout(() => this.loadCards(), 500);
      return;
    }

    this.loading = true;

    if (this.selectedWorkspace.id === 'all' && !this.allTickets['all']) {
      for (const board of Object.values(this._dataService.allBoards()).flat()) {
        await this._getDataService.setBoard(board);
      }

      for (const k of Object.keys(this._dataService.allBoards())) {
        const boards = this._dataService.allBoards()[k];
        this.allTickets[k] = Object.values(this._dataService.allTickets())
          .flat()
          .filter((c) => boards.some((b) => b.id === c.idBoard));
      }

      this.allTickets['all'] = Object.values(this._dataService.allTickets()).flat();
      this.tickets = this.formatOfTickets(this.allTickets['all']);
      this.loading = false;
    } else {
      this.tickets = this.formatOfTickets(
        this.allTickets[this.selectedWorkspace.id]
      );
      this.loading = false;
    }
  }

  formatOfTickets(cards: Card[]): any[] {
    return cards.map((card) => {
      let workspaceName = 'Unknown Workspace';
      const allBoardsRecord = this._dataService.allBoards();
      for (const [wsId, boardList] of Object.entries(allBoardsRecord)) {
        if (boardList.some((board: Board) => board.id === card.idBoard)) {
          const ws = this.workspaces.find((ws) => ws.id === wsId);
          if (ws) {
            workspaceName = ws.displayName ?? 'Unknown Workspace';
          }
          break;
        }
      }

      const ticket = {
        name: card.name,
        desc: card.desc,
        statusCard: 'normal',
        ticketId: card.id,
        manager: 'No one',
        idBoard: card.idBoard,
        workspace: workspaceName,
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
  }

  async getMembers(idMember: string): Promise<string> {
    if (this.membersFromTicket[idMember]) {
      return this.membersFromTicket[idMember];
    } else {
      const data = await lastValueFrom(this._getService.getMemberById(idMember));
      this.membersFromTicket[idMember] = data.fullName;
      return data.fullName;
    }
  }

  openModal(ticket: any): void {
    this.selectedTicket = { ...ticket };

    this._getService
      .getBoardById(this.selectedTicket.idBoard)
      .subscribe((board) => {
        this.selectedTicket.board = board;

        this._getService
          .getWorkspaceById(this.selectedTicket.board.idOrganization)
          .subscribe((workspace) => {
            this.selectedTicket = {
              ...ticket,
              organization: workspace.displayName,
            };
            this.isEditMode = true;
          });
      });
  }

  closeModal(): void {
    this.selectedTicket = null;
    this.isEditMode = false;
  }

  openCreateModal(): void {
    this.isCreateMode = true;
    this.selectedTicket = null;
  }

  closeCreateModal(): void {
    this.isCreateMode = false;
  }

  updateTicket(): void {
    this._putService
      .putCard(this.selectedTicket.ticketId, {
        name: this.selectedTicket.name,
        desc: this.selectedTicket.desc,
        idBoard: this.selectedTicket.idBoard,
      })
      .subscribe({
        next: (updatedCard) => {
          const index = this.tickets.findIndex(
            (ticket) => ticket.ticketId === updatedCard.id
          );
          if (index > -1) {
            this.tickets[index] = {
              ...this.tickets[index],
              name: updatedCard.name,
              desc: updatedCard.desc,
            };
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    this.closeModal();
  }

  createTicket(newTicket: Card): void {
    let workspaceIdFound;
    for (const [workspaceId, boardList] of Object.entries(
      this._dataService.allBoards()
    )) {
      if (boardList.some((board: Board) => board.id === newTicket.idBoard)) {
        workspaceIdFound = workspaceId;
        break;
      }
    }
    if (this.allTickets[workspaceIdFound!]) {
      this.allTickets[workspaceIdFound!].push(newTicket);
      this.allTickets['all'].push(newTicket);
      this.tickets = this.formatOfTickets(this.allTickets[this.selectedWorkspace.id]);
    }
  }
}
