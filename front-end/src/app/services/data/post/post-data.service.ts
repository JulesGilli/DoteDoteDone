import {inject, Injectable} from '@angular/core';
import {PostService} from '../../crud/post/post.service';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  private readonly _postService = inject(PostService);

  createWorkspace(bodyWorkspace: Object): void {
    this._postService.postWorkspace(bodyWorkspace);
  }

  createBoard(bodyBoard: Object): void {
    this._postService.postBoard(bodyBoard);
  }
}
