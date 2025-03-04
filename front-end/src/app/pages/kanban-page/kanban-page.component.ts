import { Component } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-kanban-page',
  imports: [ListComponent],
  templateUrl: './kanban-page.component.html',
  styleUrl: './kanban-page.component.scss',
})
export class KanbanPageComponent {}
