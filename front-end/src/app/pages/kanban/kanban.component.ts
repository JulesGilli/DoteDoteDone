import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  HostListener,
  inject,
} from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { List } from '../../models';
import { ListComponent } from '../../components/list/list.component';
import { SharedModule } from '../../../shared.module';
import {
  GetDataService,
  PostService,
  PostDataService,
  DelDataService,
  PutService,
} from '../../services';
import { DataService } from '../../services/data/data.service';
import {CreateWorkspaceModalComponent} from '../../components/create-workspace-modal/create-workspace-modal.component';
import {CreateBoardModalComponent} from '../../components/create-board-modal/create-board-modal.component';
import { RenameModalComponent } from '../../components/rename-modal/rename-modal.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-kanban',
  imports: [ListComponent, SharedModule, CreateWorkspaceModalComponent, CreateBoardModalComponent, RenameModalComponent],
  templateUrl: 'kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
  standalone: true
})
export class KanbanComponent implements OnInit {
  public readonly _dataService = inject(DataService);
  public readonly _postService = inject(PostService);
  public readonly _putService = inject(PutService);
  public readonly _getDataService = inject(GetDataService);
  public readonly _postDataService = inject(PostDataService);
  public readonly _delDataService = inject(DelDataService);
  @ViewChild('kanbanContainer') kanbanContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('createWorkspaceModal') createWorkspaceModal!: CreateWorkspaceModalComponent;
  @ViewChild('createBoardModal') createBoardModal!: CreateBoardModalComponent;
  @ViewChild('renameModal') renameModal!: RenameModalComponent;

  public isBoardMenuOpen = false;
  public isWorkspaceMenuOpen = false;
  public renameInput = '';

  autoScrollThreshold = 100;
  scrollSpeed = 10;

  renameType: 'workspace' | 'board' = 'workspace';
  showRenameModal = false;

  ngOnInit(): void {
    this._getDataService.loadWorkspaces();
  }
  openWorkspaceModal(): void {
    this.createWorkspaceModal.openModal();
  }
  openBoardModal(): void {
    this.createBoardModal.openModal();
  }
  onDragMoved(event: CdkDragMove<any>): void {
    const containerEl = this.kanbanContainer.nativeElement;
    const rect = containerEl.getBoundingClientRect();
    if (event.pointerPosition.x > rect.right - this.autoScrollThreshold)
      containerEl.scrollLeft += this.scrollSpeed;
    if (event.pointerPosition.x < rect.left + this.autoScrollThreshold)
      containerEl.scrollLeft -= this.scrollSpeed;
  }

  onMoveList(event: { list: List; direction: 'left' | 'right' }): void { /* unchanged */ }
  onDeleteList(list: List): void { this._delDataService.deleteList(list); }
  onDeleteBoard(): void { this._delDataService.deleteBoard(this._dataService.selectedBoard()!); }
  onDeleteWorkspace(): void { this._delDataService.deleteWorkspace(this._dataService.selectedWorkspace()!); }

  toggleBoardMenu(): void { this.isBoardMenuOpen = !this.isBoardMenuOpen; }
  deleteBoard(): void { this.isBoardMenuOpen = false; this.onDeleteBoard(); }

  toggleWorkspaceMenu(): void { this.isWorkspaceMenuOpen = !this.isWorkspaceMenuOpen; }
  deleteWorkspace(): void { this.isWorkspaceMenuOpen = false; this.onDeleteWorkspace(); }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.dropdown-container')) {
      this.isBoardMenuOpen = false;
      this.isWorkspaceMenuOpen = false;
    }
  }

  enterRenameWorkspaceMode(): void {
    const workspace = this._dataService.selectedWorkspace();
    if (workspace) {
      this.renameType = 'workspace';
      this.renameInput = workspace.displayName || '';
      this.showRenameModal = true;
      this.isWorkspaceMenuOpen = false;
    }
  }

  enterRenameBoardMode(): void {
    const board = this._dataService.selectedBoard();
    if (board) {
      this.renameType = 'board';
      this.renameInput = board.name || '';
      this.showRenameModal = true;
      this.isBoardMenuOpen = false;
    }
  }

  async handleRenameSave(newName: string): Promise<void> {
    if (this.renameType === 'workspace') {
      const workspace = this._dataService.selectedWorkspace();
      if (workspace) {
        const workspaceId = workspace.id;
        await this._putService.renameWorkspace(workspace.id, newName).toPromise();
        workspace.displayName = newName;
        await this._getDataService.loadWorkspaces();
        const updatedWorkspace = this._dataService.workspaces().find(ws => ws.id === workspaceId);
        if (updatedWorkspace) {
          await this._getDataService.setWorkspace(updatedWorkspace);
        }
      }
    } else {
      const board = this._dataService.selectedBoard();
      if (board) {
        const boardId = board.id;
        await this._putService.renameBoard(board.id, newName).toPromise();
        board.name = newName;
        await this._getDataService.loadBoards?.();
        const updatedBoard = this._dataService.boards().find(b => b.id === boardId);
        if (updatedBoard) {
          await this._getDataService.setBoard(updatedBoard);
        }
      }
    }

    this.showRenameModal = false;
  }

  handleRenameCancel(): void {
    this.showRenameModal = false;
  }
}
