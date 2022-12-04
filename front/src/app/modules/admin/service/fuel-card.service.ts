import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {urls} from "../../../constants";
import {IFuelCard} from "../../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class FuelCardService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<IFuelCard[]> {
    return this.httpClient.get<IFuelCard[]>(urls.fuel_card);
  }

  findById(id: string): Observable<IFuelCard> {
    return this.httpClient.get<IFuelCard>(`${urls.fuel_card}/${id}`)
  }

  create(fuelCard: IFuelCard): Observable<IFuelCard> {
    return this.httpClient.post<IFuelCard>(urls.fuel_card, fuelCard);
  }

  update(id: number, fuelCard: Partial<IFuelCard>): Observable<IFuelCard> {
    return this.httpClient.patch<IFuelCard>(`${urls.fuel_card}/${id}`, fuelCard);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${urls.fuel_card}/${id}`);
  }
}
