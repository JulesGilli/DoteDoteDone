import {Component, inject, signal} from '@angular/core';
import {DelDataService, GetService, PostService} from '../../services';
import {GetDataService} from '../../services';
import {SharedModule} from '../../../shared.module';
import {DataService} from '../../services/data/data.service';

interface Option {
  id: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-create-board-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.scss']
})
export class CreateBoardModalComponent {
  private readonly _postDataService = inject(PostService);
  private readonly _getDataService = inject(GetDataService);
  private readonly _delDataService = inject(DelDataService);
  private readonly _getService = inject(GetService);
  private readonly _dataService = inject(DataService);

  isOpened = signal<boolean>(false);

  boardName: string = "";
  selectedOption: string = "scrum";

  options: Option[] = [
    { id: 'scrum', title: 'Scrum', description: 'Plan and deliver incremental improvements through a series of sprints.', icon: '🔄' },
    { id: 'kanban', title: 'Kanban', description: 'Visualize workflows based on supply and demand, limiting work in progress for each team.', icon: '♾️' },
    { id: 'management', title: 'Project management', description: 'Automatically assign tickets to sprints by linking sprints to all values in a custom field.', icon: '📊' },
  ];

  openModal(): void {
    this.isOpened.set(true);
  }

  closeModal(): void {
    this.isOpened.set(false);
  }

  selectOption(id: string): void {
    this.selectedOption = id;
  }

  create(): void {
    const boardPayload = {
      name: this.boardName,
      idOrganization: this._dataService.selectedWorkspace()?.id,
      defaultLists: false
    };

    this._postDataService.postBoard(boardPayload).subscribe(createdBoard => {
      const listsToCreate = this.getListsForTemplate(this.selectedOption);
      listsToCreate.forEach((listName, index) => {
        const listPayload = { name: listName, idBoard: createdBoard.id, pos: index };
        this._postDataService.postList(listPayload).subscribe();
      });

      this._dataService.selectedBoard.update(() => createdBoard);

      const currentBoards = this._dataService.boards();
      const updatedBoards = [...currentBoards, createdBoard];
      this._dataService.setBoards(updatedBoards);

      this.closeModal();
    });
  }

  private getListsForTemplate(template: string): string[] {
    switch (template) {
      case 'scrum':
        return ['Backlog', 'To Do', 'In Progress', 'Done'];
      case 'kanban':
        return ['To Do', 'Doing', 'Review', 'Done'];
      case 'management':
        return ['Ideas', 'Planning', 'Execution', 'Completed'];
      default:
        return [];
    }
  }
}
