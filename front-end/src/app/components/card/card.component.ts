import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeleteCardComponent } from '../confirm-popup/delete-card/delete-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [],
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() name!: string;
  @Input() statusCard!: string;
  @Input() ticketId!: string;
  @Input() manager!: string;
  @Input() workspace!: string;

  @Output() cardClick = new EventEmitter<void>();
  @Output() deleteCard = new EventEmitter<void>();

  showConfirmPopup: boolean = false;

  constructor(private dialog: MatDialog) {}
  onCardClick(): void {
    this.cardClick.emit();
  }

  onOpenDelete(event: MouseEvent) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteCardComponent, {
      data: { objectId: this.ticketId }, // Pass the board ID to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCard.emit();
      }
    });
  }
}
