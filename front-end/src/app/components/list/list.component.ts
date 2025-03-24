import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  computed,
  HostListener,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragMove,
  DropListRef,
  CdkDropList,
  CdkDrag,
  CdkDragPlaceholder,
  CdkDragPreview
} from '@angular/cdk/drag-drop';
import { Card, List } from '../../models';
import { UtilsService } from '../../services/utils/utils.service';
import { PostService } from '../../services';
import { DragDropService } from '../../services/drag-drop.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  imports: [
    CdkDropList,
    AsyncPipe,
    NgIf,
    NgForOf,
    CdkDrag,
    CardListComponent,
    CdkDragPreview,
    CdkDragPlaceholder,
    FormsModule
  ],
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list!: List;
  @Output() cardDragMoved = new EventEmitter<CdkDragMove<any>>();
  @Output() moveListEvent = new EventEmitter<{ list: List; direction: 'left' | 'right' }>();
  @Output() deleteListEvent = new EventEmitter<string>();

  isCreateMode = false;
  selectedTicket: any = null;
  draggedCardId: string | null = null;
  isDragging: DragDropService = inject(DragDropService);

  isEditingTitle = false;
  isMenuOpen = false;

  private readonly _utilsService = inject(UtilsService);
  private readonly _postService = inject(PostService);

  @ViewChild('dropdownContainer', { static: false }) dropdownContainer!: ElementRef;

  cards = computed(() =>
    this._utilsService.tickets().filter(card => card.idList === this.list.id && card.id !== this.draggedCardId)
  );

  ngOnInit(): void {}

  openCreateModal(): void {
    this.isCreateMode = true;
    this.selectedTicket = null;
  }

  drop(event: CdkDragDrop<Card[]>): void {
    this.draggedCardId = null;
    const currentCards = this.cards();
    if (event.previousContainer === event.container) {
      moveItemInArray(currentCards, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const movedCard = event.container.data[event.currentIndex];
      movedCard.idList = this.list.id;
      this._postService.updateCard(movedCard.id, movedCard).subscribe();
    }
  }

  onDragStarted(card: Card): void {
    this.draggedCardId = card.id;
    this.isDragging.setDragging(true);
  }

  onDragEnded(card: Card): void {
    this.draggedCardId = null;
    this.isDragging.setDragging(false);
  }


  onCardDragMoved(event: CdkDragMove<any>): void {
    this.cardDragMoved.emit(event);
  }

  editTitleMode(): void {
    this.isEditingTitle = true;
  }

  saveTitle(): void {
    this.isEditingTitle = false;
    this._postService.updateList(this.list.id, { name: this.list.name }).subscribe(
      (updatedList) => {
        this.list = updatedList;
      }
    );
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  deleteList(): void {
    this._postService.updateList(this.list.id, { closed: true }).subscribe(() => {
      this.deleteListEvent.emit(this.list.id);
    });
    this.isMenuOpen = false;
  }

  moveList(direction: 'left' | 'right'): void {
    this.moveListEvent.emit({ list: this.list, direction });
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.dropdownContainer && !this.dropdownContainer.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }
}
