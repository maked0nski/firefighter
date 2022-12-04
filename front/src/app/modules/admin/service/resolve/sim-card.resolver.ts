import {Injectable} from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {ISimCard} from "../../../../interfaces";
import {SimCardService} from "../sim-card.service";

@Injectable({providedIn: 'root'})
export class SimCardResolver implements Resolve<ISimCard[]> {
    constructor(private simCardService: SimCardService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISimCard[]> | Promise<ISimCard[]> | ISimCard[] {
        return this.simCardService.findAll();
    }

}
