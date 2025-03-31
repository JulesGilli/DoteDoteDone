import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../index';
import { Observable } from 'rxjs';
import { Board, Card, List, Workspace } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class PutService {
  private readonly _http = inject(HttpClient);
  private readonly _auth = inject(AuthService);
  private uri: string = '';
  private apiTrello = 'https://api.trello.com/1/';
  initializeUri(tableName: string, idObject: string): void {
    this.uri =
      this.apiTrello +
      `${tableName}/${idObject}?${this._auth.getApiKeyTokenUrl()}`;
  }

  putWorkspace(
    idWorkspace: string,
    bodyWorkspace: Object
  ): Observable<Workspace> {
    this.initializeUri('organizations', idWorkspace);
    return this._http.put<Workspace>(this.uri, bodyWorkspace);
  }
  putBoard(idBoard: string, bodyBoard: Object): Observable<Board> {
    this.initializeUri('boards', idBoard);
    return this._http.put<Board>(this.uri, bodyBoard);
  }

  putList(idList: string, bodyList: Object): Observable<List> {
    this.initializeUri('lists', idList);
    return this._http.put<List>(this.uri, bodyList);
  }

  putCard(idCard: string, bodyCard: Object): Observable<Card> {
    this.initializeUri('cards', idCard);
    return this._http.put<Card>(this.uri, bodyCard);
  }
}
