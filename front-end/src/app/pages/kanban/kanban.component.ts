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
import { CreateWorkspaceModalComponent } from '../../components/create-workspace-modal/create-workspace-modal.component';
import { CreateBoardModalComponent } from '../../components/create-board-modal/create-board-modal.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { DeleteBoardComponent } from '../../components/confirm-popup/delete-board/delete-board.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWorkspaceComponent } from '../../components/confirm-popup/delete-workspace/delete-workspace.component';

@Component({
  selector: 'app-kanban',
  imports: [
    ListComponent,
    SharedModule,
    CreateWorkspaceModalComponent,
    CreateBoardModalComponent,
  ],
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
})
export class KanbanComponent implements OnInit {
  public readonly _dataService = inject(DataService);
  public readonly _postService = inject(PostService);
  public readonly _putService = inject(PutService);
  public readonly _getDataService = inject(GetDataService);
  public readonly _postDataService = inject(PostDataService);
  public readonly _delDataService = inject(DelDataService);
  @ViewChild('kanbanContainer') kanbanContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('createWorkspaceModal')
  createWorkspaceModal!: CreateWorkspaceModalComponent;
  @ViewChild('createBoardModal') createBoardModal!: CreateBoardModalComponent;
  public isBoardMenuOpen: boolean = false;
  public isWorkspaceMenuOpen: boolean = false;
  autoScrollThreshold = 100;
  scrollSpeed = 10;

  constructor(private dialog: MatDialog) {}

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
    const containerRect = containerEl.getBoundingClientRect();
    const pointerX = event.pointerPosition.x;
    if (pointerX > containerRect.right - this.autoScrollThreshold) {
      containerEl.scrollLeft += this.scrollSpeed;
    }
    if (pointerX < containerRect.left + this.autoScrollThreshold) {
      containerEl.scrollLeft -= this.scrollSpeed;
    }
  }
  onMoveList(event: { list: List; direction: 'left' | 'right' }): void {
    const boardId = this._dataService.selectedBoard()?.id;
    if (!boardId) {
      return;
    }
    this._dataService.lists.update((prev) => {
      const boardLists = prev[boardId] || [];
      const currentIndex = boardLists.findIndex((l) => l.id === event.list.id);
      if (currentIndex === -1) {
        return prev;
      }
      let newIndex = currentIndex;
      if (event.direction === 'left' && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else if (
        event.direction === 'right' &&
        currentIndex < boardLists.length - 1
      ) {
        newIndex = currentIndex + 1;
      }
      if (newIndex !== currentIndex) {
        const updatedLists = [...boardLists];
        const [movedList] = updatedLists.splice(currentIndex, 1);
        updatedLists.splice(newIndex, 0, movedList);
        updatedLists.forEach((l, index) => {
          l.pos = index;
          this._putService.putList(l.id, { pos: index }).subscribe();
        });
        return {
          ...prev,
          [boardId]: updatedLists,
        };
      }
      return prev;
    });
  }

  onDeleteList(list: List): void {
    const selectedBoard = this._dataService.selectedBoard();
    if (!selectedBoard) {
      return;
    }
    this._delDataService.deleteList(list);
  }

  onDeleteBoard(): void {
    const selectedBoard = this._dataService.selectedBoard();
    if (!selectedBoard) {
      return;
    }
    const dialogRef = this.dialog.open(DeleteBoardComponent, {
      data: { objectId: selectedBoard.id }, // Pass the board ID to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  onDeleteWorkspace(): void {
    const selectedWorksapce = this._dataService.selectedWorkspace();
    if (!selectedWorksapce) {
      return;
    }
    const dialogRef = this.dialog.open(DeleteWorkspaceComponent, {
      data: { objectId: selectedWorksapce.id }, // Pass the board ID to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  toggleBoardMenu(): void {
    this.isBoardMenuOpen = !this.isBoardMenuOpen;
  }
  enterRenameBoardMode(): void {
    this.isBoardMenuOpen = false;
  }
  deleteBoard(): void {
    this.isBoardMenuOpen = false;
    this.onDeleteBoard();
  }
  toggleWorkspaceMenu(): void {
    this.isWorkspaceMenuOpen = !this.isWorkspaceMenuOpen;
  }
  enterRenameWorkspaceMode(): void {
    this.isWorkspaceMenuOpen = false;
  }
  deleteWorkspace(): void {
    this.isWorkspaceMenuOpen = false;
    this.onDeleteWorkspace();
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const dropdown = (event.target as HTMLElement).closest(
      '.dropdown-container'
    );
    if (!dropdown) {
      this.isBoardMenuOpen = false;
      this.isWorkspaceMenuOpen = false;
    }
  }
}
