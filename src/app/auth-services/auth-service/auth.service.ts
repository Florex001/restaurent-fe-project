import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const BASIC_URI = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signuprequest: any): Observable<any> {
    return this.http.post(BASIC_URI + "api/auth/signup", signuprequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASIC_URI + "api/auth/login", loginRequest);
  }

}
