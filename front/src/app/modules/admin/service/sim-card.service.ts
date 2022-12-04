import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {ISimCard} from "../../../interfaces";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class SimCardService {


  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<ISimCard[]> {
    return this.httpClient.get<ISimCard[]>(urls.sim_card);
  }

  findFree(): Observable<ISimCard[]> {
    return this.httpClient.get<ISimCard[]>(`${urls.sim_card}/free`);
  }

  findById(id: string): Observable<ISimCard> {
    return this.httpClient.get<ISimCard>(`${urls.sim_card}/${id}`)
  }

  create(fuelCard: ISimCard): Observable<ISimCard> {
    console.log(fuelCard)
    return this.httpClient.post<ISimCard>(urls.sim_card, fuelCard);
  }

  update(id: number, fuelCard: Partial<ISimCard>): Observable<ISimCard> {
    return this.httpClient.patch<ISimCard>(`${urls.sim_card}/${id}`, fuelCard);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${urls.sim_card}/${id}`);
  }
}
