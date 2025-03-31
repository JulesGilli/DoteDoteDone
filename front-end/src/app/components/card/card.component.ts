import { Component, Input, Output, EventEmitter } from '@angular/core';
import {DeleteCardComponent} from '../confirm-popup/delete-card/delete-card.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [
    DeleteCardComponent,
    NgIf
  ],
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() titre!: string;
  @Input() statusCard!: string;
  @Input() ticketId!: string;
  @Input() manager!: string;

  @Output() cardClick = new EventEmitter<void>();
  @Output() deleteCard = new EventEmitter<void>();

  showConfirmPopup: boolean = false;

  onCardClick(): void {
    this.cardClick.emit();
  }

  onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.showConfirmPopup = true;
  }

  onConfirmDelete(): void {
    this.deleteCard.emit();
    this.showConfirmPopup = false;
  }

  onCancelDelete(): void {
    this.showConfirmPopup = false;
  }
}
