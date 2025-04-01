import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DelDataService, DeleteService } from '../../../services';
import { ConfirmPopupComponent } from '../confirm-popup.component';

@Component({
  selector: 'app-delete-workspace',
  templateUrl: '../confirm-popup.component.html',
  styleUrls: ['../confirm-popup.component.scss'],
})
export class DeleteWorkspaceComponent extends ConfirmPopupComponent {
  public override message = 'Do you really want to remove this workspace?';
  private workspaceId!: string;
  private _delService = inject(DelDataService);
  constructor(
    dialogRef: MatDialogRef<DeleteWorkspaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { objectId: string }
  ) {
    super(dialogRef);
    this.workspaceId = data.objectId;
  }

  override onConfirm(): void {
    this._delService.deleteWorkspace(this.workspaceId);
    super.onConfirm();
  }
}
