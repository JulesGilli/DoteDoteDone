import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../index';
import { Observable } from 'rxjs';
import { Board, Card, Label, List, Member, Workspace } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class GetService {
  private readonly _authService = inject(AuthService);
  private apiTrello = 'https://api.trello.com/1';
  private http = inject(HttpClient);

  getAllWorkspace(): Observable<Workspace[]> {
    return new Observable((observer) => {
      this.getMemberIdByToken().subscribe((data: any) => {
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

  getAllBoards(organizationsMembersObject: Object): Observable<Board[]> {
    return this.getAll('boards', organizationsMembersObject);
  }
  // organizationsMemberObject={
  //   organizations: {idOrganization};
  // } || {
  // members: {idMember}
  // }
  // }

  getAllLists(boardsObject: Object): Observable<List[]> {
    return this.getAll('lists', boardsObject);
  }
  //boardsObject={
  //   boards: {idBoard};
  // }

  getAllCards(memberBoardOrListObject: Object): Observable<Card[]> {
    return this.getAll('cards', memberBoardOrListObject);
  }

  getAllLabels(boards: Object): Observable<Label> {
    return this.getAll('labels', boards);
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
  getAll(typeQuest: string | null, fromWhatTable: Object): Observable<any> {
    let uri = this.apiTrello;
    uri += `/${Object.keys(fromWhatTable)[0]}/${Object.values(fromWhatTable)[0]}`;
    if (typeQuest) {
      uri += `/${typeQuest}`;
    }
    uri += '?';
    uri += this._authService.getApiKeyTokenUrl();
    return this.http.get(uri, {
      responseType: 'json',
    });
  }

  getAllMembersByBoard(boardId: Object) {
    return this.getAll('members', { boards: boardId });
  }

  getMemberIdByToken(): Observable<Member> {
    return this.getAll('member', { tokens: this._authService.getToken() });
  }

  getMemberById(membersId: string): Observable<Member> {
    return this.getAll(null, { members: membersId });
  }
}
