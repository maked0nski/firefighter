import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import {AuthService, TokenStorageService} from "./services";

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
            request = this.addTokenHeader(request, this.tokenStorageService.getAccessToken())
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

    addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {Authorization: `Bearer ${token}`}
        })
    }

    handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
        const refrashToken = this.tokenStorageService.getRefreshAccessToken();
        if (!this.isRefreshing && refrashToken) {
            this.isRefreshing = true;
            return this.authService.refrashToken(refrashToken).pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    return next.handle(this.addTokenHeader(request, token.access_token));
                }), catchError(() => {
                    this.isRefreshing = false
                    this.tokenStorageService.deleteToken();
                    this.router.navigate(['login'])
                    return throwError(() => new Error('token invalid or expired'))
                })
            )
        }
    }
}
