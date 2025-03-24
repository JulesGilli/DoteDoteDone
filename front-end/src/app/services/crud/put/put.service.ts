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

  private apiTrello = 'https://api.trello.com/1';
  putGeneric(tableName: Object, objectId:string, bodyUpdate: Object): Observable<any> {

    let uri = this.apiTrello + `/${tableName}/${objectId}?${this._auth.getApiKeyTokenUrl}`;
    return this._http.put(uri,bodyUpdate);
  }

  // putWorspace(idWorkspace:string, bodyWorspace: Object): Observable<Workspace> {
  //   return this.putGeneric('organizations',idWorkspace, bodyWorspace);
  // }
  // putBoard(bodyBoard: Object): Observable<Board> {
  //   return this.putGeneric('boards', bodyBoard);
  // }

  // putList(bodyList: Object): Observable<List> {
  //   return this.putGeneric('lists', bodyList);
  // }

  // putCard(cardData: any): Observable<Card> {
  //   const uri = `${this.apiTrello}/cards?${this._auth.getApiKeyTokenUrl()}`;
  //   return this._http.put<Card>(uri, cardData);
  // }

  // updateCard(cardId: string, cardData: any): Observable<Card> {
  //   const uri = `${this.apiTrello}/cards/${cardId}?${this._auth.getApiKeyTokenUrl()}`;
  //   return this._http.put<Card>(uri, cardData);
  // }
}
