import { Injectable, inject, signal } from '@angular/core'; import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class DataTestService {
  private readonly _authService = inject(AuthService);
  private apiTrello = "https://api.trello.com/1";
  private apiKeyToken = `&key=${environment.apiKey}&token=${this._authService.getToken()}`;
  private http = inject(HttpClient);

  getAllWorkspace(membersObject: Object) {
    return this.getAll('workspaces', membersObject);
  }
  /*membersObject={
    members: {id};
    }*/

  getAllBoards(organizationsMembersObject: Object) {
    return this.getAll('boards', organizationsMemberObject)
  }
  // organizationsMemberObject={
  //   organizations: {idOrganization};
  // } || {
  // members: {idMember}
// }

  getAllLists(boardsObject:Object){
    return this.getAll('lists',boardsObject);
  }
  //boardsObject={
  //   boards: {idBoard};
  // }

  getAllCards(memberBoardOrListObject:Object){
    return this.getAll('cards',memberBoardOrListObject);
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
  getAll(typeQuest: String, fromWhatTable: Object) {
    let uri = this.apiTrello;
    uri += `/${Object.keys(fromWhatTable)[0]}/
            ${Object.values(fromWhatTable)[0]}/
            ${typeQuest}?`;
    uri += this.apiKeyToken;
    return this.http.get(uri);
  }
}

