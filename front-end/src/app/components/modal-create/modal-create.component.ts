import {
  Component,
  Output,
  EventEmitter,
  inject,
  OnInit,
  Input,
} from '@angular/core';
import { GetService, PostService } from '../../services';
import { Board, Card, Member, Workspace } from '../../models';
import { SharedModule } from '../../../shared.module';

type DropdownOption = 'workspace' | 'statusCard' | 'manager' | 'board';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  imports: [SharedModule],
  styleUrls: ['./modal-create.component.scss'],
})
export class ModalCreateComponent implements OnInit {
  @Input() selectedWorkspaceFromMain!: Workspace;
  @Input() allWorkspacesFromMain: Workspace[] = [];
  @Input() allBoardsFromMain: Record<string, Board[]> = {};

  private readonly _getService = inject(GetService);
  private readonly _postService = inject(PostService);

  selectedWorkspace!: Workspace;
  workspaces: Workspace[] = [];

  allBoards: Record<string, Board[]> = {};
  boards: Board[] = [];
  selectedBoard!: Board;

  allMembers!:Record<string,Member[]>;
  selectedMember!:Member;
  members!:Member[];

  ngOnInit() {
    if (this.allWorkspacesFromMain) {
      if (this.allWorkspacesFromMain.length !== 0) {
        this.workspaces = this.allWorkspacesFromMain;
        this.selectedWorkspace = this.selectedWorkspaceFromMain;
        if (this.allBoardsFromMain) {
          this.boards = this.allBoardsFromMain[this.selectedWorkspace.id];
          this.allBoards = this.allBoardsFromMain;
        }
      }
    }
    this.updateBoards();
  }

  updateBoards() {
    if (this.selectedWorkspace && this.allBoards[this.selectedWorkspace.id]) {
      this.boards = this.allBoards[this.selectedWorkspace.id];
      if (this.boards.length !== 0) {
        this.selectedBoard = this.boards[0];
      }
      return;
    }
    this._getService
      .getAllBoards({ organizations: this.selectedWorkspace.id })
      .subscribe((data: Board[]) => {
        this.allBoards[this.selectedWorkspace.id] = data;
        this.boards = data;
        if (this.boards.length > 0) {
          this.selectedBoard = this.boards[0];
        }
      });
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
      // idList: this.template.getDefaultIdListFromBoard(newTicket.board),
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
