import { Component, inject, OnInit } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Board, Workspace } from '../../models';
import { GetService } from '../../services';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-kanban',
  imports: [ListComponent, SharedModule],
  templateUrl: 'kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent implements OnInit {
  private readonly _getService = inject(GetService);
  selectedWorkspace!: Workspace;
  workspaces: Workspace[] = [];
  boards: Board[] = [];
  selectedBoard!: Board;

  ngOnInit() {
    this._getService.getAllWorkspace().subscribe((data: Workspace[]) => {
      this.workspaces = data;
      if (this.workspaces.length > 0) {
        this.selectedWorkspace = this.workspaces[0];
      }

      this.updateBoards()
    });
  }

  updateBoards() {
    if (this.selectedWorkspace) {
      this._getService.getAllBoards({organizations: this.selectedWorkspace.id}).subscribe((data: Board[]) => {
        this.boards = data;
        if (this.boards.length > 0) {
          this.selectedBoard = this.boards[0];
        }
      });
    }
  }
}
