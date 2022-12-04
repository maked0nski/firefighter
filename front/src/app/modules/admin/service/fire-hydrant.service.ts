import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {IFireHydrant, IFireHydrantUpdate} from "../../../interfaces";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class FireHydrantService {

  constructor(private httpClient: HttpClient) {
  }

  update(id: number, data: IFireHydrantUpdate): Observable<IFireHydrantUpdate> {
    return this.httpClient.patch<IFireHydrantUpdate>(`${urls.hydrant}/${id}`, data);
  }

  create(data: IFireHydrant): Observable<IFireHydrantUpdate> {
    return this.httpClient.post<IFireHydrantUpdate>(urls.hydrant, data)
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${urls.hydrant}/${id}`)
  }
}
