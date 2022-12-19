import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import {IUser} from "../../intesface";
import {UsersService} from "../users.service";

@Injectable({providedIn: 'root'})
export class UsersResolver implements Resolve<IUser[]> {

  constructor(private usersService:UsersService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser[]> | Promise<IUser[]> | IUser[] {
    return this.usersService.findAll();
  }
}
