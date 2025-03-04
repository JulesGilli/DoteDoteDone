import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  template: `
    <div class="confirm-overlay">
      <div class="confirm-content">
        <p>{{ message }}</p>
        <div class="confirm-buttons">
          <button class="confirm-btn" (click)="onConfirm()">Oui</button>
          <button class="cancel-btn" (click)="onCancel()">Non</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent {
  @Input() message: string = "Voulez-vous vraiment supprimer cette carte ?";
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
