import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../../../auth-services/storage-service/storage.service";

const BASIC_URL = ["http://localhost:8080/api/admin/"]

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  createCategory(categoryDto: any): Observable<any>{
    return this.http.post<[]>(BASIC_URL + "category", categoryDto,
      {
        headers: this.createAuthorizationHeader()
      })
  }

  createAuthorizationHeader():HttpHeaders {
    let authHeaders:HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization", "Bearer " + StorageService.getToken()
    );
  }
}
