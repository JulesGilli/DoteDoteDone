import {Component, Input, Output, EventEmitter, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';
import {DataService} from '../../services/data/data.service';
import {GetDataService} from '../../services';

type DropdownOption = 'workspace' | 'statusCard' | 'manager' | 'board';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  imports: [FormsModule, NgIf],
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent {
  protected readonly _dataService = inject(DataService);
  protected readonly _getDataService = inject(GetDataService);

  @Input() ticket: any;
  @Output() close = new EventEmitter<void>();
  @Output() valid = new EventEmitter<void>();

  dropdowns: Record<DropdownOption, boolean> = {
    workspace: false,
    statusCard: false,
    manager: false,
    board: false
  };

  closeModal(): void {
    this.close.emit();
  }

  validModal(): void {
    this.valid.emit();
  }

  toggleDropdown(option: DropdownOption): void {
    this.dropdowns[option] = !this.dropdowns[option];
  }

  isDropdownOpen(option: DropdownOption): boolean {
    return this.dropdowns[option];
  }

  selectOption(option: DropdownOption, value: string): void {
    this.ticket[option] = value;
    this.dropdowns[option] = false;
  }
}
