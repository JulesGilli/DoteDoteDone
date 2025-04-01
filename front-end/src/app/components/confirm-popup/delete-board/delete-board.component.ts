import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DelDataService, DeleteService } from '../../../services';
import { ConfirmPopupComponent } from '../confirm-popup.component';

@Component({
  selector: 'app-delete-board',
  templateUrl: '../confirm-popup.component.html',
  styleUrls: ['../confirm-popup.component.scss'],
})
export class DeleteBoardComponent extends ConfirmPopupComponent {
  public override message = 'Do you really want to remove this board?';
  private boardId!: string;
  private _delService = inject(DelDataService);
  constructor(
    dialogRef: MatDialogRef<DeleteBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { objectId: string }
  ) {
    super(dialogRef);
    this.boardId = data.objectId;
  }

  override onConfirm(): void {
    this._delService.deleteBoard(this.boardId);
    super.onConfirm();
  }
}
