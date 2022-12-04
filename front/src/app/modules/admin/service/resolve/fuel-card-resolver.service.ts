import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {IFuelCard} from "../../../../interfaces";
import {FuelCardService} from "../fuel-card.service";

@Injectable({
  providedIn: 'root'
})
export class FuelCardResolverService implements Resolve<IFuelCard[]> {

  constructor(private fuelCardService: FuelCardService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFuelCard[]> | Promise<IFuelCard[]> | IFuelCard[] {
    return this.fuelCardService.findAll();
  }

}
