import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUser} from "../modules/admin/intesface";
import {IClient, ISimCard} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userStorage = new BehaviorSubject<IUser | undefined>(undefined)
  simCardStorage = new BehaviorSubject<ISimCard[] | undefined>(undefined)
  simCardFreeStorage = new BehaviorSubject<ISimCard[] | undefined>(undefined)
  clientStorage = new BehaviorSubject<IClient | undefined>(undefined)
}
