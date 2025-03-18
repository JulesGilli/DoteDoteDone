import { Component, inject, OnInit } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { SharedModule } from '../../../shared.module';
import { UtilsService } from '../../services/utils/utils.service';
import {LoadingComponent} from '../../components/loading/loading.component';

@Component({
  selector: 'app-kanban',
  imports: [ListComponent, LoadingComponent, SharedModule],
  templateUrl: 'kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent implements OnInit {
  public readonly _utilsService = inject(UtilsService);

  ngOnInit(): void {
    this._utilsService.loadWorkspaces();
  }
}
