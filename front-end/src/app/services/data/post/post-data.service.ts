import {inject, Injectable} from '@angular/core';
import {PostService} from '../../crud/post/post.service';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  private readonly _postService = inject(PostService);

  createWorkspace(bodyWorkspace: Object): void {
    console.log('Creating workspace:', bodyWorkspace);
    this._postService.postWorkspace(bodyWorkspace).subscribe(response => {
      console.log('Workspace created:', response);
    }, error => {
      console.error('Error creating workspace:', error);
    });
  }
}
