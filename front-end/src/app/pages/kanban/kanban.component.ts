import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
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
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-kanban',
  imports: [ListComponent, SharedModule],
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
export class KanbanComponent implements OnInit, AfterViewInit {
  public readonly _dataService = inject(DataService);
  public readonly _postService = inject(PostService);
  public readonly _putService = inject(PutService);

  public readonly _getDataService = inject(GetDataService);

  public readonly _postDataService = inject(PostDataService);
  public readonly _delDataService = inject(DelDataService);

  @ViewChild('kanbanContainer') kanbanContainer!: ElementRef<HTMLDivElement>;

  autoScrollThreshold = 100;
  scrollSpeed = 10;

  ngOnInit(): void {
    this._getDataService.loadWorkspaces();
  }

  ngAfterViewInit(): void {}

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

  createWorkspace(): void {
    const workspaceName = prompt(
      'Enter the name of the workspace you want to create'
    );

    if (!workspaceName) {
      return;
    }

    const workspaceToCreate = {
      displayName: workspaceName,
      desc: 'Workspace created via Trello API',
    };

    this._postDataService.createWorkspace(workspaceToCreate);
  }
}
