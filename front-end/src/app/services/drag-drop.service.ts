import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DragDropService {
  private _isDragging = new BehaviorSubject<boolean>(false);
  public isDragging$ = this._isDragging.asObservable();

  setDragging(isDragging: boolean) {
    this._isDragging.next(isDragging);
  }
}
