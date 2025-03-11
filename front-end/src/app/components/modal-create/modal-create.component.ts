import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

type DropdownOption = 'workspace' | 'statusCard' | 'manager' | 'board';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  imports: [FormsModule, NgIf, NgFor],
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent {
  @Input() workspaces: any[] = [];
  @Input() boards: any[] = [];

  newTicket: any = {
    titre: '',
    resume: '',
    workspace: '',
    statusCard: 'normal',
    manager: 'Not assigned',
    board: ''
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

  getWorkspaceName(): string {
    const ws = this.workspaces.find(w => w.id === this.newTicket.workspace);
    return ws ? ws.displayName : 'Sélectionnez un workspace';
  }

  getBoardName(): string {
    const board = this.boards.find(b => b.id === this.newTicket.board);
    return board ? board.name : 'Sélectionnez un board';
  }
}
