import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteService } from '../../../services';
import { ConfirmPopupComponent } from '../confirm-popup.component';

@Component({
  selector: 'app-delete-card',
  templateUrl: '../confirm-popup.component.html',
  styleUrls: ['../confirm-popup.component.scss'],
})
export class DeleteCardComponent extends ConfirmPopupComponent {
  public override message = 'Do you really want to remove this card?';
  private cardId!: string;
  private _delService = inject(DeleteService);
  constructor(
    dialogRef: MatDialogRef<DeleteCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { objectId: string }
  ) {
    super(dialogRef);
    this.cardId = data.objectId;
  }

  override onConfirm(): void {
    this._delService.deleteCard(this.cardId).subscribe();
    super.onConfirm();
  }
}
