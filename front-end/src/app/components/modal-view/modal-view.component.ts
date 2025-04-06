import { Component, Input, Output, EventEmitter } from '@angular/core';
import {DeleteCardComponent} from '../confirm-popup/delete-card/delete-card.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  imports: [
    DeleteCardComponent,
    NgIf
  ],
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent {
  @Input() ticket: any;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>(); // Émission de l'événement suppression

  isConfirmVisible: boolean = false; // Contrôle l'affichage de la popup

  closeModal() {
    this.close.emit();
  }

  editModal() {
    this.edit.emit();
  }

  showDeleteConfirm(): void {
    this.isConfirmVisible = true;
  }

  onDeleteConfirmed(): void {
    this.delete.emit();
    this.isConfirmVisible = false;
  }

  onDeleteCancelled(): void {
    this.isConfirmVisible = false;
  }
}
