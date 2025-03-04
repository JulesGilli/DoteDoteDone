import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalViewComponent } from '../../components/modal-view/modal-view.component';
import { ModalEditComponent } from '../../components/modal-edit/modal-edit.component';
import { ModalCreateComponent } from '../../components/modal-create/modal-create.component';
import { Workspace } from '../../models';
import { GetService } from '../../services';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    NgIf,
    FormsModule,
    ModalViewComponent,
    ModalEditComponent,
    ModalCreateComponent,
  ],
  styleUrls: ['./all-cards.component.scss'],
})
export class AllCardsComponent {
  _getService = inject(GetService);
  selectedWorkspace!: string | undefined;
  workspaces: Workspace[] = [];

  selectedTicket: any = null;

  isEditMode: boolean = false;
  isCreateMode: boolean = false;

  tickets = [
    {
      titre: 'Card name',
      statusCard: 'normal',
      ticketId: 'DEV-01',
      manager: 'username',
    },
    {
      titre: 'Card name',
      statusCard: 'normal',
      ticketId: 'DEV-02',
      manager: 'username',
    },
    {
      titre: 'Card name',
      statusCard: 'medium',
      ticketId: 'DEV-03',
      manager: 'username',
    },
    {
      titre: 'Card name',
      statusCard: 'critical',
      ticketId: 'DEV-04',
      manager: 'username',
    },
    {
      titre: 'Card name',
      statusCard: 'minor',
      ticketId: 'DEV-05',
      manager: 'username',
    },
    {
      titre: 'Card name',
      statusCard: 'minor',
      ticketId: 'DEV-06',
      manager: 'username',
    },
    {
      titre: 'Card name',
      statusCard: 'blocking',
      ticketId: 'DEV-07',
      manager: 'username',
    },
  ];

  ngOnInit() {
    this._getService.getAllWorkspace().subscribe((data: Workspace[]) => {
      this.workspaces = data;
      if(this.workspaces.length>0){
        this.selectedWorkspace=this.workspaces[0].displayName;
      }
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

  onValidEdit() {
    this.isEditMode = false;
  }

  openCreateModal() {
    this.isCreateMode = true;
    this.selectedTicket = null;
  }

  closeCreateModal() {
    this.isCreateMode = false;
  }

  onCreateTicket(newTicket: any) {
    this.tickets.push(newTicket);
    this.closeCreateModal();
  }

  onDeleteTicket() {
    if (this.selectedTicket) {
      const index = this.tickets.findIndex(
        ticket => ticket.ticketId === this.selectedTicket.ticketId
      );
      if (index > -1) {
        this.tickets.splice(index, 1);
      }
      this.closeModal();
    }
  }
}
