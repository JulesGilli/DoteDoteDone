import { inject, Injectable } from '@angular/core';
import { AuthService, PutService } from '../../index';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Card, List } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  private readonly _http = inject(HttpClient);
  private readonly _authService = inject(AuthService);
  private readonly _update = inject(PutService);

  private deleteGeneric(
    tableName: string,
    objectId: string
  ): Observable<string> {
    let uri = `https://api.trello.com/1/${tableName}/${objectId}?${this._authService.getApiKeyTokenUrl()}`;
    return this._http.delete<string>(uri);
  }

  deleteWorkspace(idWorkspace: string): Observable<string> {
    return this.deleteGeneric('organizations', idWorkspace);
  }

  deleteCard(idCard: string): Observable<string> {
    return this.deleteGeneric('cards', idCard);
  }
  deleteList(idList: string) {
    return this._update.putList(idList, { closed: true });
  }
  deleteBoard(idBoard: string): Observable<string> {
    return this.deleteGeneric('boards', idBoard);
  }
}
