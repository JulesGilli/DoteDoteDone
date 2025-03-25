import {Component, inject, signal} from '@angular/core';
import {PostService} from '../../services';
import {GetDataService} from '../../services/data/get/get-data.service';
import {SharedModule} from '../../../shared.module';

interface Option {
  id: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-create-board-modal',
  imports: [
    SharedModule
  ],
  templateUrl: './create-board-modal.component.html',
  styleUrl: './create-board-modal.component.scss'
})
export class CreateBoardModalComponent {
  private readonly _postDataService = inject(PostService);
  private readonly _getDataService = inject(GetDataService);

  isOpened = signal<boolean>(false);
  boardName = signal<string>("");

  boardToCreate = {
    name: this.boardName,
    desc: 'Board created via Trello API'
  };

  selectedOption: string | null = null;

  openModal(): void {
    this.isOpened.set(true);
  }

  closeModal(): void {
    this.isOpened.set(false);
  }

  create(): void {
    if (!this.boardName) {
      return;
    }

    this._postDataService.postBoard(this.boardToCreate);

    this._getDataService.loadWorkspaces();

    this.closeModal();
  }

  options: Option[] = [
    { id: 'scrum', title: 'Scrum', description: 'Plan and deliver incremental improvements through a series of sprints.', icon: '🔄' },
    { id: 'kanban', title: 'Kanban', description: 'Visualize workflows based on supply and demand, limiting work in progress for each team.', icon: '♾️' },
    { id: 'management', title: 'Project management', description: 'Automatically assign tickets to sprints by linking sprints to all values in a custom field.', icon: '📊' },
  ];

  selectOption(id: string) {
    this.selectedOption = id;
  }
}
