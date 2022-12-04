import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {AuthUserInterface} from "../../login/interfaces";
import {Observable} from "rxjs";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) {
  }

  register(user: AuthUserInterface): Observable<AuthUserInterface> {
    return this.httpClient.post<AuthUserInterface>(urls.register, user)
  }

}
