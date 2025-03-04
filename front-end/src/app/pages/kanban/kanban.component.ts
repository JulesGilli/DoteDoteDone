import { Component } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-kanban',
  imports: [ListComponent],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent {}
