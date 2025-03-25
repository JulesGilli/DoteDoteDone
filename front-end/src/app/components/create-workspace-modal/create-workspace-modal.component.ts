import {Component, inject, Input, signal} from '@angular/core';
import {SharedModule} from '../../../shared.module';
import {GetDataService} from '../../services';
import {PostDataService, PostService} from '../../services';

@Component({
  selector: 'app-create-workspace-modal',
  imports: [SharedModule],
  templateUrl: './create-workspace-modal.component.html',
  styleUrl: './create-workspace-modal.component.scss'
})
export class CreateWorkspaceModalComponent {
  private readonly _postDataService = inject(PostDataService);
  private readonly _getDataService = inject(GetDataService);

  isOpened = signal<boolean>(false);
  workspaceName: string = "";

  openModal(): void {
    this.isOpened.set(true);
  }

  closeModal(): void {
    this.isOpened.set(false);
  }

  create(): void {
    const workspace = {
      displayName: this.workspaceName,
      desc: 'Workspace created via Trello API'
    };

    this._postDataService.createWorkspace(workspace);

    this._getDataService.loadWorkspaces();
    this.closeModal();
  }
}
