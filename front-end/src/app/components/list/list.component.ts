import {Component, inject, Input} from '@angular/core';
import { CardListComponent } from '../card-list/card-list.component';
import {Card, List} from '../../models';
import {UtilsService} from '../../services/utils/utils.service';
import {SharedModule} from '../../../shared.module';
import {ModalCreateComponent} from '../modal-create/modal-create.component';

@Component({
  selector: 'app-list',
  imports: [CardListComponent, SharedModule, ModalCreateComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() list!: List;

  isEditMode: boolean = false;
  isCreateMode: boolean = false;

  selectedTicket: any = null;

  private readonly _utilsService = inject(UtilsService);

  public getCardsForList(): Card[] {
    return this._utilsService.tickets().filter((card) => card.idList === this.list.id);
  }

  openCreateModal() {
    this.isCreateMode = true;
    this.selectedTicket = null;
  }

  closeCreateModal() {
    this.isCreateMode = false;
  }
}
