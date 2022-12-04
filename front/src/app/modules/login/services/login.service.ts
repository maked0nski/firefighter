import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {AuthUserInterface, TokenInterface} from "../interfaces";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  login(loginInterface: AuthUserInterface): Observable<TokenInterface> {
    return this.httpClient.post<TokenInterface>(urls.login, loginInterface);
  }

}
