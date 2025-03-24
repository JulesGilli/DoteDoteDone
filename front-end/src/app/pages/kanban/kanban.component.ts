import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, inject} from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { ListComponent } from '../../components/list/list.component';
import { SharedModule } from '../../../shared.module';
import {LoadingComponent} from '../../components/loading/loading.component';
import {GetDataService} from '../../services/data/get/get-data.service';

@Component({
  selector: 'app-kanban',
  imports: [ListComponent, LoadingComponent, SharedModule],
  templateUrl: 'kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit, AfterViewInit {
  public readonly _getDataService = inject(GetDataService);

  // Récupérer le conteneur Kanban via le template reference
  @ViewChild('kanbanContainer') kanbanContainer!: ElementRef<HTMLDivElement>;

  autoScrollThreshold = 100;
  scrollSpeed = 10;

  ngOnInit(): void {
    this._getDataService.loadWorkspaces();
    debugger;
  }

  ngAfterViewInit(): void {
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
}
