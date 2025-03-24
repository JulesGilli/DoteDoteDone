import {Component, inject, signal} from '@angular/core';
import {PostDataService} from '../../services/data/post/post-data.service';

@Component({
  selector: 'app-create-workspace-modal',
  imports: [],
  templateUrl: './create-workspace-modal.component.html',
  styleUrl: './create-workspace-modal.component.scss'
})
export class CreateWorkspaceModalComponent {
  private readonly _postDataService = inject(PostDataService);

  isOpened = signal<boolean>(false);

  openModal(): void {
    this.isOpened.set(true);
  }

  closeModal(): void {
    this.isOpened.set(false);
  }

  createWorkspace(): void {
    this.openModal();

    const workspaceName = prompt('Enter the name of the workspace you want to create');

    if (!workspaceName) {
      return;
    }

    const workspaceToCreate = {
      displayName: workspaceName,
      desc: 'Workspace created via Trello API'
    };

    this._postDataService.createWorkspace(workspaceToCreate);

    this.closeModal();
  }
}
