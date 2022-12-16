import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

import {IUser} from "../../intesface";
import {TokenStorageService} from "../../../../services";
import {UsersService} from "../../service";

@Injectable({
    providedIn: 'root'
})
export class AdminResolverService implements Resolve<IUser> {

    constructor(
        private tokenStorageService: TokenStorageService,
        private usersService: UsersService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> | Promise<IUser> | IUser {
        const parseUser = JSON.parse(atob(this.tokenStorageService.getAccessToken().split('.')[1]));
        return this.usersService.findById(parseUser.id)
    }

}
