import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  standalone: true,
  imports: [
    CardComponent,
    ModalComponent,
    NgForOf,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent {
  selectedWorkspace = 'workspace1';
  selectedTicket: any = null;

  tickets = [
    { titre: 'Card name', statusCard: 'normal', ticketId: 'DEV-01', manager: 'username' },
    { titre: 'Card name', statusCard: 'normal', ticketId: 'DEV-02', manager: 'username' },
    { titre: 'Card name', statusCard: 'medium', ticketId: 'DEV-03', manager: 'username' },
    { titre: 'Card name', statusCard: 'critical', ticketId: 'DEV-04', manager: 'username' },
    { titre: 'Card name', statusCard: 'minor', ticketId: 'DEV-05', manager: 'username' },
    { titre: 'Card name', statusCard: 'minor', ticketId: 'DEV-06', manager: 'username' },
    { titre: 'Card name', statusCard: 'blocking', ticketId: 'DEV-07', manager: 'username' }
  ];

  openModal(ticket: any) {
    this.selectedTicket = ticket;
  }

  closeModal() {
    this.selectedTicket = null;
  }
}
