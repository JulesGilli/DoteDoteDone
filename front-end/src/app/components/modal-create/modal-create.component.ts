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
import { forkJoin } from 'rxjs';
import { GetDataService } from '../../services/data/get/get-data.service';
import { DataService } from '../../services/data/data.service';

type DropdownOption = 'workspace' | 'statusCard' | 'manager' | 'board';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  imports: [SharedModule],
  styleUrls: ['./modal-create.component.scss'],
})
export class ModalCreateComponent implements OnInit {
  @Input() selectedWorkspaceFromMain!: Workspace;

  private readonly _getService = inject(GetService);
  private readonly _postService = inject(PostService);
  readonly _dataService = inject(DataService);
  private readonly _getDataService = inject(GetDataService);
  selectedWorkspace!: Workspace;

  selectedBoard!: Board;

  allMembers: Record<string, Member[]> = {};
  selectedMember!: Member;
  members!: Member[];

  // idListDefault:Record<string,string>;

  async ngOnInit() {
    await this._getDataService.loadWorkspaces();
    if (this.selectedWorkspaceFromMain.id !== 'all') {
      this.selectedWorkspace = this.selectedWorkspaceFromMain;
    } else {
      this.selectedWorkspace = this._dataService.workspaces()[0];
    }
    this.updateBoards();
  }

  async updateBoards() {
    await this._getDataService.setWorkspace(this.selectedWorkspace);
    this.selectedBoard = this._dataService.selectedBoard()!;
    this.updateMembers();
  }

  changeBoard() {
    this._getDataService.setBoard(this.selectedBoard);
  }

  updateMembers() {
    if (this.allMembers[this.selectedBoard.id]) {
      this.members = this.allMembers[this.selectedBoard.id];
      this.selectedMember = this.members[0];
    } else {
      const memberRequests = this._dataService
        .boards()
        .map((board) => this._getService.getAllMembersByBoard(board.id));

      forkJoin(memberRequests).subscribe((memberDataArray) => {
        this._dataService.boards().forEach((board, index) => {
          this.allMembers[board.id] = memberDataArray[index];
        });
        this.members = this.allMembers[this.selectedBoard.id];
        this.selectedMember = this.members[0];
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
      idList: this._dataService.lists()[this.selectedBoard.id][0].id,
    };

    this._postService.postCard(payload).subscribe((card: Card) => {
      const ticket: Card = {
        id: card.id,
        name: this.newTicket.titre,
        desc: this.newTicket.resume,
        idList: this._dataService.lists()[this.selectedBoard.id][0].id,
        idBoard: this.selectedBoard.id,
        idMembers: [this.selectedMember.id],
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
