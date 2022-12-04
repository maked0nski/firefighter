import {Injectable} from '@angular/core';
import {IFireExtinguishers} from "../../../interfaces";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class FireExtinguishersService {

  constructor(private httpClient: HttpClient) {
  }

  create(data: IFireExtinguishers): Observable<IFireExtinguishers> {
    return this.httpClient.post<IFireExtinguishers>(urls.extinguishers, data);
  }

  update(id: number, data: Partial<IFireExtinguishers>): Observable<IFireExtinguishers> {
    return this.httpClient.patch<IFireExtinguishers>(`${urls.extinguishers}/${id}`, data);
  }


  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${urls.extinguishers}/${id}`);
  }
}
