import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getByCep(cep: string): Observable<any>{
    return this.http.get<any>(`https://brasilapi.com.br/api/cep/v1/${cep}`)
  }
}
