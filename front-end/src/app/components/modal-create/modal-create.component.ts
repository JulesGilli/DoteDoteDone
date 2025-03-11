import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { GetService, PostService } from '../../services';
import { Board, Card, Workspace } from '../../models';

type DropdownOption = 'workspace' | 'statusCard' | 'manager' | 'board';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  imports: [FormsModule, NgIf, NgFor],
  styleUrls: ['./modal-create.component.scss'],
})
export class ModalCreateComponent {
  @Input() workspaces: Workspace[] = [];
  @Input() boards: Board[] = [];
  @Input() selectedWorkspace!: Workspace;

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

  private _postService = inject(PostService);

  selectedWorkspaceToggle!: Workspace;

  selectedBoardToggle!: Board;
  boardByWorkspace!: Board[];

  ngOnInit() {
    this.selectedWorkspaceToggle = this.selectedWorkspace;
    this.reloadBoards();
  }
  changeWorkspace(workspace: Workspace) {
    this.newTicket.workspace = workspace.id;
    this.selectedWorkspaceToggle = workspace;
    this.reloadBoards();
    this.closeDropdown('workspace');
  }

  reloadBoards() {
    this.boardByWorkspace = this.boards.filter(
      (b) => b.idOrganization === this.selectedWorkspaceToggle.id
    );
    this.selectedBoardToggle = this.boardByWorkspace[0];
  }

  changeBoard(board: Board) {
    this.newTicket.board = board.id;
    this.selectedBoardToggle = board;
    this.closeDropdown('board');
  }

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
