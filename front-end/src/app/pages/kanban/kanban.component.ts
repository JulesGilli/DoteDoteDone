import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, inject} from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { List } from '../../models';
import { ListComponent } from '../../components/list/list.component';
import { SharedModule } from '../../../shared.module';
import {LoadingComponent} from '../../components/loading/loading.component';
import {GetDataService} from '../../services/data/get/get-data.service';
import {PostService} from '../../services';
import {CreateWorkspaceModalComponent} from '../../components/create-workspace-modal/create-workspace-modal.component';
import {CreateBoardModalComponent} from '../../components/create-board-modal/create-board-modal.component';

@Component({
  selector: 'app-kanban',
  imports: [ListComponent, LoadingComponent, SharedModule, CreateWorkspaceModalComponent, CreateBoardModalComponent],
  templateUrl: 'kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent implements OnInit, AfterViewInit {
  public readonly _getDataService = inject(GetDataService);
  public readonly _postService = inject(PostService);

  @ViewChild('kanbanContainer') kanbanContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('createWorkspaceModal') createWorkspaceModal!: CreateWorkspaceModalComponent;
  @ViewChild('createBoardModal') createBoardModal!: CreateBoardModalComponent;

  autoScrollThreshold = 100;
  scrollSpeed = 10;

  ngOnInit(): void {
    this._getDataService.loadWorkspaces();
    debugger;
  }

  ngAfterViewInit(): void {
    console.log('CreateWorkspaceModalComponent:', this.createWorkspaceModal);
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
    const boardId = this._getDataService.selectedBoard()?.id;
    if (!boardId) {
      return;
    }
    this._getDataService.lists.update(prev => {
      const boardLists = prev[boardId] || [];
      const currentIndex = boardLists.findIndex(l => l.id === event.list.id);
      if (currentIndex === -1) {
        return prev;
      }
      let newIndex = currentIndex;
      if (event.direction === 'left' && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else if (event.direction === 'right' && currentIndex < boardLists.length - 1) {
        newIndex = currentIndex + 1;
      }
      if (newIndex !== currentIndex) {
        const updatedLists = [...boardLists];
        const [movedList] = updatedLists.splice(currentIndex, 1);
        updatedLists.splice(newIndex, 0, movedList);
        updatedLists.forEach((l, index) => {
          l.pos = index;
          this._postService.updateList(l.id, { pos: index }).subscribe();
        });
        return {
          ...prev,
          [boardId]: updatedLists
        };
      }
      return prev;
    });
  }

  onDeleteList(deletedListId: string): void {
    const boardId = this._getDataService.selectedBoard()?.id;
    if (!boardId) {
      return;
    }
    this._getDataService.lists.update(prev => {
      const boardLists = prev[boardId] || [];
      const updatedLists = boardLists.filter(l => l.id !== deletedListId);
      return {
        ...prev,
        [boardId]: updatedLists
      };
    });
  }
}
