import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';

type DropdownOption = 'workspace' | 'statusCard' | 'manager' | 'board';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  imports: [FormsModule, NgIf],
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent {
  newTicket: any = {
    titre: '',
    resume: '',
    workspace: 'T-DEV',
    statusCard: 'normal',
    manager: 'Not assigned',
    board: 'Board name'
  };

  dropdowns: Record<DropdownOption, boolean> = {
    workspace: false,
    statusCard: false,
    manager: false,
    board: false
  };

  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  closeModal(): void {
    this.close.emit();
  }

  createTicket(): void {
    this.create.emit(this.newTicket);
  }

  toggleDropdown(option: DropdownOption): void {
    this.dropdowns[option] = !this.dropdowns[option];
  }

  isDropdownOpen(option: DropdownOption): boolean {
    return this.dropdowns[option];
  }

  closeDropdown(option: DropdownOption): void {
    this.dropdowns[option] = false;
  }
}
