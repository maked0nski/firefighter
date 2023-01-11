import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {AuthUserInterface, TokenInterface} from "../interfaces";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  login(user: AuthUserInterface): Observable<TokenInterface> {
    return this.httpClient.post<TokenInterface>(urls.login, user);
  }

}
