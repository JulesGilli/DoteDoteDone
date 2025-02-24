import { Injectable, inject, signal } from '@angular/core';import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataTestService {
  private readonly _authService = inject(AuthService)
 private http = inject(HttpClient);

  getAllGeneric(idWorkspace:String,fieldQuery: String){
    let uri = `https://api.trello.com/1/organizations/{idWorkspace}/${fieldQuery}?`;
    uri+=`&key=${process.env["API_KEY"]}&token=${this._authService.getToken()}`;

    return this.http.get(uri);
  }
}

