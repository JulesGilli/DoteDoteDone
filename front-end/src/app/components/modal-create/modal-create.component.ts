import {Component, Output, EventEmitter, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';
import {GetService} from '../../services';
import {Board, Workspace} from '../../models';

type DropdownOption = 'workspace' | 'statusCard' | 'manager' | 'board';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  imports: [FormsModule, NgIf],
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {
  private readonly _getService = inject(GetService);

  selectedWorkspace!: Workspace;
  workspaces: Workspace[] = [];
  boards: Board[] = [];
  selectedBoard!: Board;

  ngOnInit() {
    this._getService.getAllWorkspace().subscribe((data: Workspace[]) => {
      this.workspaces = data;
      if (this.workspaces.length > 0) {
        this.selectedWorkspace = this.workspaces[0];
      }

      this.updateBoards()
    });
  }

  updateBoards() {
    if (this.selectedWorkspace) {
      this._getService.getAllBoards({organizations: this.selectedWorkspace.id}).subscribe((data: Board[]) => {
        this.boards = data;
        if (this.boards.length > 0) {
          this.selectedBoard = this.boards[0];
        }
      });
    }
  }

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
