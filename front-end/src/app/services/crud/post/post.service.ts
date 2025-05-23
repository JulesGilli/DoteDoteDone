import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../index';
import { Workspace, Board, Card, List } from '../../../models';
import { Observable } from 'rxjs';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly _http = inject(HttpClient);
  private readonly _auth = inject(AuthService);
  private uri: string = '';

  private apiTrello = 'https://api.trello.com/1';
  initializeUri(tableName: string): void {
    this.uri =
      this.apiTrello + `/${tableName}?${this._auth.getApiKeyTokenUrl()}`;
  }

  postWorkspace(bodyWorkspace: Object): Observable<Workspace> {
    this.initializeUri('organizations');
    return this._http.post<Workspace>(this.uri, bodyWorkspace);
  }

  postBoard(bodyBoard: Object): Observable<Board> {
    this.initializeUri('boards');
    return this._http.post<Board>(this.uri, bodyBoard);
  }

  postList(bodyList: Object): Observable<List> {
    this.initializeUri('lists');
    return this._http.post<List>(this.uri, bodyList);
  }

  postCard(cardData: any): Observable<Card> {
    this.initializeUri('cards');
    return this._http.post<Card>(this.uri, cardData);
  }
}
