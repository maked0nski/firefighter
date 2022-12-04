import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

import {urls} from "../constants";
import {TokenInterface} from "../modules/login/interfaces";
import {TokenStorageService} from "./token-storage.service";

@Injectable({providedIn: 'root'})
export class AuthService {

  private accessTokenKey = 'access_token'

  constructor(
    private httpClient: HttpClient,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {}

  isAuthorization(): boolean {
    const parse = JSON.parse(atob(this.tokenStorageService.getAccessToken().split('.')[1]));
    let exp =parse['exp']
    // if (Date.now() >= exp * 1000) {
    //   return false;
    // }
    return !!localStorage.getItem(this.accessTokenKey) && Date.now() < exp * 1000;
  }

  refrashTokens(): Observable<TokenInterface> {
    const refresh_token = this.tokenStorageService.getRefreshAccessToken();
    return this.httpClient.post<TokenInterface>(urls.refresh, {refresh_token}).pipe(
      tap((tokens: TokenInterface) => {
        this.tokenStorageService.setToken(tokens);
      })
    )
  }

  logout(): void {
    this.httpClient.post(urls.logout, null);
    this.tokenStorageService.deleteToken();
    this.router.navigate(['login']);
  }

  getRole(){
    const parse = JSON.parse(atob(this.tokenStorageService.getAccessToken().split('.')[1]));
    return parse.role
  }

}
