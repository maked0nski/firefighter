import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable} from 'rxjs';

import {IClient} from "../../../../interfaces";
import {ClientsService} from "../clients.service";

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsResolver implements Resolve<IClient> {

  constructor(private clientsService:ClientsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClient> | Promise<IClient> | IClient {

    return this.clientsService.getAllDataById(Number(route.paramMap.get('id')))
  }
}
