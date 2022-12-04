import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {IClient, IClientContact, ISimCard} from "../../../interfaces";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<IClient[]> {
    return this.httpClient.get<IClient[]>(urls.client);
  }

  getAllDataById(id: number): Observable<IClient> {
    return this.httpClient.get<IClient>(`${urls.client}/${id}/all`);
  }

  create(data:IClient):Observable<IClient> {
    return this.httpClient.post<IClient>(urls.client, data)
  }

  update(id: number, data: Partial<IClient>):Observable<IClient> {
    return this.httpClient.patch<IClient>(`${urls.client}/${id}`, data);
  }

}
