import {Component, inject, signal} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {DataService} from '../../services/data/data.service';
import {SharedModule} from '../../../shared.module';
import {GetDataService} from '../../services';

@Component({
  selector: 'app-create-ticket-modal',
  imports: [
    ReactiveFormsModule, SharedModule
  ],
  templateUrl: './create-ticket-modal.component.html',
  styleUrl: './create-ticket-modal.component.scss'
})
export class CreateTicketModalComponent {
  protected readonly _dataService = inject(DataService);
  protected readonly _getDataService = inject(GetDataService);

  isOpened = signal<boolean>(false);

  newTicket = {
    name: "",
    desc: "",
    statusCard: "normal",
    idOrganization: this._dataService.selectedWorkspace()?.id,
    idBoard: this._dataService.selectedBoard()?.id,
  }

  openModal(): void {
    this.isOpened.set(true);
  }

  closeModal(): void {
    this.isOpened.set(false);
  }

  createTicket(): void {

  }
}
