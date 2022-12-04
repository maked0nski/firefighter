import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {IObservation} from "../../../interfaces";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  constructor(private httpClient: HttpClient) {
  }

  create(data: IObservation): Observable<IObservation> {
    return this.httpClient
      .post<IObservation>(urls.observation, data);
  }

  update(id: number, data: IObservation): Observable<IObservation> {
    return this.httpClient
      .patch<IObservation>(`${urls.observation}/${id}`, data)
  }

  delete(id:number):Observable<void> {
    return this.httpClient
      .delete<void>(`${urls.observation}/${id}`)
  }
}
