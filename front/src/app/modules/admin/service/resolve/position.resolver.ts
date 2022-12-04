import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {IPosition} from "../../../../interfaces/position";
import {PositionService} from "../position.service";

@Injectable({
  providedIn: 'root'
})
export class PositionResolver implements Resolve<IPosition[]> {

  constructor(private positionService: PositionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPosition[]> | Promise<IPosition[]> | IPosition[] {
    return this.positionService.getAll();
  }
}
