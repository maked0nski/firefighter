import {Injectable} from "@angular/core";
import {TokenInterface} from "../modules/login/interfaces";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private accessTokenKey = 'access_token'
  private refreshTokenKey = 'refresh_token'

  setToken(token: TokenInterface): void {
    localStorage.setItem(this.accessTokenKey, token.access_token)
    localStorage.setItem(this.refreshTokenKey, token.refresh_token)
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey) as string
  }

  getRefreshAccessToken(): string {
    return localStorage.getItem(this.refreshTokenKey) as string;
  }

  deleteToken(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  isAuthorization(): boolean {
    return !!localStorage.getItem(this.accessTokenKey)
  }


}
