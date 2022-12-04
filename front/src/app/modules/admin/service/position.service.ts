import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPosition} from "../../../interfaces";
import {urls} from "../../../constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private httpClient: HttpClient) {
  }

  create(dto: IPosition): Observable<IPosition> {
    return this.httpClient.post<IPosition>(urls.position, dto);
  }

  getAll(): Observable<IPosition[]> {
    return this.httpClient.get<IPosition[]>(urls.position);
  }

  getById(id: string): Observable<IPosition> {
    return this.httpClient.get<IPosition>(`${urls.position}/${id}`)
  }

  update(id: number, dto: IPosition): Observable<IPosition> {
    return this.httpClient.patch<IPosition>(`${urls.position}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${urls.position}/${id}`);
  }

}
