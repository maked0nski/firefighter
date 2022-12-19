import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {IUser} from "../intesface";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: IUser

  constructor(private httpClient:HttpClient) { }

  findAll(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(urls.users)
  }

  findById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${urls.users}/${id}`)
  }

  update(id: number, user: Partial<IUser>): Observable<IUser> {
    return this.httpClient.patch<IUser>(`${urls.users}/${id}`, user);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${urls.users}/${id}`);
  }

  saveAvatar(id: number, uploadData: any) {
    console.log(id, uploadData)
    return this.httpClient.patch(`${urls.users}/${id}`, uploadData);
  }

}
