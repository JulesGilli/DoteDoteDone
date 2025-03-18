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
import { UtilsService } from '../../services/utils/utils.service';

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
  private readonly _util = inject(UtilsService);

  selectedWorkspace!: Workspace;
  workspaces: Workspace[] = [];

  allBoards: Record<string, Board[]> = {};
  boards: Board[] = [];
  selectedBoard!: Board;

  allMembers!: Record<string, Member[]>;
  selectedMember!: Member;
  members!: Member[];

  // idListDefault:Record<string,string>;

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
    this._util.setBoard(this.selectedBoard);
    this._util.loadListsWithCards();
    const payload = {
      name: this.newTicket.titre,
      desc: this.newTicket.resume,
      idList: this._util.lists()[this.selectedBoard.id][0].id,
    };

    this._postService.postCard(payload).subscribe((card: Card) => {
      const ticket:Card={
        id:card.id,
        name:this.newTicket.titre,
        desc: this.newTicket.resume,
        idList: this._util.lists()[this.selectedBoard.id][0].id,
        idBoard:this.selectedBoard.id,
      }
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
