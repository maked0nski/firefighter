import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {urls} from "../../../constants";
import {ICar} from "../../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private httpClient: HttpClient) {
  }

  create(dto: ICar): Observable<ICar> {
    return this.httpClient.post<ICar>(urls.cars, dto);
  }

  getAll(): Observable<ICar[]> {
    return this.httpClient.get<ICar[]>(urls.cars)
  }

  getById(id: string): Observable<ICar> {
    return this.httpClient.get<ICar>(`${urls.cars}/${id}`)
  }

  update(id: number, dto: Partial<ICar>) {
    return this.httpClient.patch<ICar>(`${urls.cars}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${urls.cars}/${id}`);
  }
}
