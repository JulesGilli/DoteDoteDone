import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { GetService, PostService } from '../../services';
import { Board, Card, Workspace } from '../../models';
import {SharedModule} from '../../../shared.module';

type DropdownOption = 'workspace' | 'statusCard' | 'manager' | 'board';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  imports: [SharedModule],
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {
  private readonly _getService = inject(GetService);
  private readonly _postService = inject(PostService);

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
    workspace: '',
    statusCard: 'normal',
    manager: 'Not assigned',
    board: '',
  };

  dropdowns: Record<DropdownOption, boolean> = {
    workspace: false,
    statusCard: false,
    manager: false,
    board: false,
  };

  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  buttonCreateTicket() {
    const payload = {
      name: this.newTicket.titre,
      desc: this.newTicket.resume,
      // idList: this.getIdListFromBoard(newTicket.board),
    };

    this._postService.postCard(payload).subscribe((card: Card) => {
      const ticket = {
        titre: card.name,
        resume: card.desc,
        statusCard: this.newTicket.statusCard,
        ticketId: card.id,
        manager: this.newTicket.manager,
        board: this.newTicket.board,
        workspace: this.newTicket.workspace,
      };
      this.create.emit(ticket);
      this.closeModal();
    });
  }

  closeModal(): void {
    this.close.emit();
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
