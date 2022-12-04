import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {Router} from "@angular/router";

import {AuthService, TokenStorageService} from "./services";
import {TokenInterface} from "./modules/login/interfaces";


@Injectable()
export class MainInterceptor implements HttpInterceptor {

  isRefreshing = false

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthorization = this.authService.isAuthorization();
    if (isAuthorization) {
      request = this.addToken(request, this.tokenStorageService.getAccessToken())
    }

    return next.handle(request).pipe(
      catchError((res: HttpErrorResponse) => {
        if (res && res.error && res.status === 401) {
          return this.handle401Error(request, next);

        }
        return throwError(() => new Error('token invalid or expired'))
      })
    ) as any;
  }

  addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    })
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler): any {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.authService.refrashTokens().pipe(
        switchMap((tokens: TokenInterface) => {
          return next.handle(this.addToken(request, tokens.access_token))
        }),
        catchError(() => {
          this.isRefreshing = false
          this.tokenStorageService.deleteToken();
          this.router.navigate(['login'])
          return throwError(() => new Error('token invalid or expired'))
        })
      )
    }
  }
}
