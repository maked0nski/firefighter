import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

import {IUser} from "../../intesface";
import {TokenStorageService} from "../../../../services";
import {UserProfileService} from "../user-profile.service";

@Injectable({
  providedIn: 'root'
})
export class AdminResolverService  implements Resolve<IUser>{

  constructor(
    private tokenStorageService: TokenStorageService,
    private userProfileService: UserProfileService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> | Promise<IUser> | IUser {
    const parseUser = JSON.parse(atob(this.tokenStorageService.getAccessToken().split('.')[1]));
    return this.userProfileService.findById(parseUser.id)
  }

}
