import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IClientContact} from "../../../interfaces";
import {Observable} from "rxjs";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class ClientContactService {

  constructor(private httpClient: HttpClient) { }

  update(id: number, data: Partial<IClientContact>):Observable<IClientContact> {
    return this.httpClient.patch<IClientContact>(`${urls.contact}/${id}`, data);
  }

  create(data:IClientContact):Observable<IClientContact> {
    return this.httpClient.post<IClientContact>(urls.contact, data)
  }

}
