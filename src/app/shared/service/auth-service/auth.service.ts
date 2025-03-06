import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.apiUrl;

  constructor(private http:HttpClient) {}

  logIn(request: {user:string, password:string}){
    return this.http.post<{data:{token:string}}>(`${this.API_URL}/v1/login`, request);
  }

  requestResetPassword(request:{email:string}){
    return this.http.post(`${this.API_URL}/v1/login/requestResetPassword`, request);
  }

  resetPassword(request:{code:string, password:string}){
    return this.http.post(`${this.API_URL}/v1/login/resetPassword`, request);
  }
}
