import { Component, EventEmitter, inject, Input, OnInit, Output, computed } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragMove, DropListRef} from '@angular/cdk/drag-drop';
import { CardListComponent } from '../card-list/card-list.component';
import { Card, List } from '../../models';
import { SharedModule } from '../../../shared.module';
import { PostService } from '../../services';
import { DragDropService } from '../../services/drag-drop.service';
import {GetDataService} from '../../services/data/get/get-data.service';


@Component({
  selector: 'app-list',
  imports: [CardListComponent, SharedModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list!: List;
  @Output() cardDragMoved = new EventEmitter<CdkDragMove<any>>();

  isCreateMode = false;
  selectedTicket: any = null;
  draggedCardId: string | null = null;
  isDragging: DragDropService = inject(DragDropService);

  private readonly _getDataService = inject(GetDataService);
  private readonly _postService = inject(PostService);

  cards = computed(() =>
    this._getDataService.tickets().filter(card => card.idList === this.list.id && card.id !== this.draggedCardId)
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

  protected readonly DropListRef = DropListRef;
  protected readonly DragDropService = DragDropService;
}
