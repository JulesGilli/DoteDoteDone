import { Component, Input, OnInit } from '@angular/core';
import { ConfirmPopupComponent } from '../confirm-popup.component';
import { DeleteService } from '../../../services';

@Component({
  selector: 'app-delete-card',
  imports: [],
  templateUrl: '../confirm-popup.component.html',
  styleUrl: '../confirm-popup.component.scss',
})
export class DeleteCardComponent
  extends ConfirmPopupComponent
  implements OnInit
{
  @Input() cardToDelId!: string;

  constructor(private _delService: DeleteService) {
    super();
  }
  ngOnInit(): void {
    this.message = 'Do you really want to remove this card?';
  }
  override onConfirm(): void {
    this._delService.deleteCard(this.cardToDelId).subscribe(() => {
      super.onConfirm();
    });
  }
}
