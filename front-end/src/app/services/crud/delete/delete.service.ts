import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../index';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { List } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  private readonly _http = inject(HttpClient);
  private readonly _auth = inject(AuthService);

  private deleteGeneric(tableName: string, objectId: string): Observable<string> {
    let uri= `https://api.trello.com/1/${tableName}/${objectId}`;
    return this._http.delete<string>(uri);
  }

  deleteWorkspace(idWorkspace:string):Observable<string>{
    return this.deleteGeneric('organizations',idWorkspace);
  }

  deleteCard(idCard:string):Observable<string>{
    return this.deleteGeneric('cards',idCard);
  }
  deleteList(list:List):Observable<string>{
    if(list.name==="default"){
      return of("403");
    }
    return this.deleteGeneric('lists',list.id);
  }
  deleteBoard(idBoard:string):Observable<string>{
    return this.deleteGeneric('boards',idBoard);
  }
}
