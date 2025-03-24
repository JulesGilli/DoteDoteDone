import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../index';
import { Workspace, Board, Card, List } from '../../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly _http = inject(HttpClient);
  private readonly _auth = inject(AuthService);

  private apiTrello = 'https://api.trello.com/1';
  postGeneric(tableName: string, bodyCreation: Object): Observable<any> {
    let uri = this.apiTrello + `/${tableName}/`;
    let body = { ...bodyCreation, ...this._auth.getApiKeyTokenJson };
    return this._http.post(uri, body);
  }

  postWorspace(bodyWorspace: Object): Observable<Workspace> {
    return this.postGeneric('organizations', bodyWorspace);
  }
  postBoard(bodyBoard: Object): Observable<Board> {
    return this.postGeneric('boards', bodyBoard);
  }

  postList(bodyList: Object): Observable<List> {
    return this.postGeneric('lists', bodyList);
  }

  postCard(cardData: any): Observable<Card> {
    const uri = `${this.apiTrello}/cards?${this._auth.getApiKeyTokenUrl()}`;
    return this._http.post<Card>(uri, cardData);
  }

  updateCard(cardId: string, cardData: any): Observable<Card> {
    const uri = `${this.apiTrello}/cards/${cardId}?${this._auth.getApiKeyTokenUrl()}`;
    return this._http.put<Card>(uri, cardData);
  }
  updateList(listId: string, listData: any): Observable<List> {
    const uri = `${this.apiTrello}/lists/${listId}?${this._auth.getApiKeyTokenUrl()}`;
    return this._http.put<List>(uri, listData);
  }


}
