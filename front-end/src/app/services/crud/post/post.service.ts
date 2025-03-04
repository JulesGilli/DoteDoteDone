import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly _http = inject(HttpClient);
  private readonly _auth = inject(AuthService);

  private apiTrello = 'https://api.trello.com/1';
  postGeneric(tableName: string, bodyCreation: Object): Observable<any> {
    let body = { ...bodyCreation, ...this._auth.getApiKeyTokenJson };
    return this._http.post(this.apiTrello, body);
  }
}
