import {Component, inject, Input} from '@angular/core';
import { Card } from '../../models';
import {SharedModule} from '../../../shared.module';
import {ModalEditComponent} from '../modal-edit/modal-edit.component';
import {GetDataService, GetService, PutService} from '../../services';

@Component({
  selector: 'app-card-list',
  imports: [SharedModule, ModalEditComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  @Input() card!: Card;

  private readonly _getService = inject(GetService);
  private readonly _putService = inject(PutService);
  private readonly _getDataService = inject(GetDataService);

  isEditMode: boolean = false;
  selectedTicket: any = null;

  tickets: any[] = [];

  openModal(ticket: any): void {
    if (ticket.id) {
      this.selectedTicket = { ...ticket };

      this._getService.getBoardById(this.selectedTicket.idBoard).subscribe(board => {
        this.selectedTicket.board = board;

        console.log('whes', this.selectedTicket.board.name);

        this._getService.getWorkspaceById(this.selectedTicket.board.idOrganization).subscribe(workspace => {
          this.selectedTicket = { ...ticket, organization: workspace.displayName };
          this.isEditMode = true;
        });
      });
    } else {
      console.error("Ticket ID is undefined!");
    }
  }

  closeModal(): void {
    this.selectedTicket = null;
    this.isEditMode = false;
  }

  updateTicket(): void {
    if (!this.selectedTicket.id) {
      console.error("Ticket ID is undefined!");
      return;
    }

    this._putService
      .putCard(this.selectedTicket.id, {
        name: this.selectedTicket.name,
        desc: this.selectedTicket.desc,
        idBoard: this.selectedTicket.idBoard,
        manager: this.selectedTicket.manager,
      })
      .subscribe({
        next: (updatedCard) => {
          const index = this.tickets.findIndex(
            (ticket) => ticket.id === updatedCard.id
          );
          if (index > -1) {
            this.tickets[index] = {
              ...this.tickets[index],
              name: updatedCard.name,
              desc: updatedCard.desc,
              manager: updatedCard.idMembers,
            };
          }
        },
        error: (err) => {
          console.error('Erreur while updating card:', err);
        },
      });

    this._getDataService.loadAll().then();
    this.closeModal();
  }
}
