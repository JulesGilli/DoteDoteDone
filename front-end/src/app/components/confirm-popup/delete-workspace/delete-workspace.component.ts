import { Component, Input, OnInit } from '@angular/core';
import { ConfirmPopupComponent } from '../confirm-popup.component';
import { DeleteService } from '../../../services';

@Component({
  selector: 'app-delete-workspace',
  imports: [],
  templateUrl: '../confirm-popup.component.html',
  styleUrl: '../confirm-popup.component.scss',
})
export class DeleteWorkspaceComponent
  extends ConfirmPopupComponent
  implements OnInit
{
  @Input() workspaceToDelId!: string;

  constructor(private _delService: DeleteService) {
    super();
  }
  ngOnInit(): void {
    this.message = 'Do you really want to remove this workspace?';
  }
  override onConfirm(): void {
    this._delService.deleteWorkspace(this.workspaceToDelId).subscribe(() => {
      super.onConfirm();
    });
  }
}
