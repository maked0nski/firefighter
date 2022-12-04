import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {ClientsService} from "../clients.service";
import {IClient} from "../../../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ClientsResolver implements Resolve<IClient[]> {

  constructor(private clientsService: ClientsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClient[]> | Promise<IClient[]> | IClient[] {
    return this.clientsService.getAll()
  }
}
