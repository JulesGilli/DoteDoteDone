import { Component, Input, OnInit } from '@angular/core';
import { ConfirmPopupComponent } from '../confirm-popup.component';
import { DeleteService } from '../../../services';

@Component({
  selector: 'app-delete-board',
  imports: [],
  templateUrl: '../confirm-popup.component.html',
  styleUrl: '../confirm-popup.component.scss',
})
export class DeleteBoardComponent
  extends ConfirmPopupComponent
  implements OnInit
{
  @Input() boardToDelId!: string;

  constructor(private _delService: DeleteService) {
    super();
  }
  ngOnInit(): void {
    this.message = 'Do you really want to remove this board?';
  }
  override onConfirm(): void {
    this._delService.deleteBoard(this.boardToDelId).subscribe(() => {
      super.onConfirm();
    });
  }
}
