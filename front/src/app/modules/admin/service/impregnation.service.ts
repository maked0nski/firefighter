import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {IImpregnation, IImpregnationCreate} from "../../../interfaces";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class ImpregnationService {

  constructor(private httpClient: HttpClient) {
  }

  update(id: number, data: IImpregnation): Observable<IImpregnation> {
    return this.httpClient.patch<IImpregnation>(`${urls.impregnation}/${id}`, data);
  }

  create(data: IImpregnationCreate): Observable<IImpregnation> {
    return this.httpClient.post<IImpregnation>(urls.impregnation, data)
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${urls.impregnation}/${id}`)
  }

}
