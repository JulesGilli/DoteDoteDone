import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetService {
  private readonly _authService = inject(AuthService);
  private apiTrello = 'https://api.trello.com/1';
  private http = inject(HttpClient);

  getAllWorkspace(): Observable<any> {
    return new Observable((observer) => {
      this.getMemberId().subscribe((data: any) => {
        if (data) {
          const memberId = Object.values(data)[0];
          this.getAll('organizations', { members: memberId }).subscribe(
            (organizations) => {
              observer.next(organizations);
              observer.complete();
            }
          );
        }
      });
    });
  }

  /*membersObject={
    members: {id};
    }*/

  getAllBoards(organizationsMembersObject: Object) {
    return this.getAll('boards', organizationsMembersObject);
  }
  // organizationsMemberObject={
  //   organizations: {idOrganization};
  // } || {
  // members: {idMember}
  // }
  // }

  getAllLists(boardsObject: Object) {
    return this.getAll('lists', boardsObject);
  }
  //boardsObject={
  //   boards: {idBoard};
  // }

  getAllCards(memberBoardOrListObject: Object): Observable<Object> {
    return this.getAll('cards', memberBoardOrListObject);
  }
  /*
  memberBoardOrListObject={
    members: {idMember}
    } || {
    boards: {idBoard} 
    } || {
    lists:{idList}
    }
   */
  getAll(typeQuest: String, fromWhatTable: Object): Observable<Object> {
    let uri = this.apiTrello;
    uri += `/${Object.keys(fromWhatTable)[0]}/${Object.values(fromWhatTable)[0]}/${typeQuest}?`;
    uri += this._authService.getApiKeyTokenUrl();
    return this.http.get(uri, {
      responseType: 'json',
    });
  }

  getMemberId(): Observable<Object> {
    return this.getAll('member', { tokens: this._authService.getToken() });
  }
}
