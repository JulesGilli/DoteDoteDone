import {Component, inject, Input, signal} from '@angular/core';
import {SharedModule} from '../../../shared.module';
import {GetDataService} from '../../services/data/get/get-data.service';
import {PostService} from '../../services';

@Component({
  selector: 'app-create-workspace-modal',
  imports: [SharedModule],
  templateUrl: './create-workspace-modal.component.html',
  styleUrl: './create-workspace-modal.component.scss'
})
export class CreateWorkspaceModalComponent {
  private readonly _postDataService = inject(PostService);
  private readonly _getDataService = inject(GetDataService);

  isOpened = signal<boolean>(false);
  workspaceName = signal<string>("");

  workspaceToCreate = {
    displayName: this.workspaceName,
    desc: 'Workspace created via Trello API'
  };

  openModal(): void {
    this.isOpened.set(true);
  }

  closeModal(): void {
    this.isOpened.set(false);
  }

  create(): void {
    if (!this.workspaceName) {
      return;
    }

    this._postDataService.postWorkspace(this.workspaceToCreate);

    this._getDataService.loadWorkspaces();

    this.closeModal();
  }

  change() {
    console.log("workspace name:", this.workspaceToCreate.displayName())
  }
}
