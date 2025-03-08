import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorScheduleService {

  API_URL = environment.apiUrl;

  constructor(private http:HttpClient) {}

  setSchedule(request:{idMedico:string, diaSemana:string, horario:string}[]){
    console.log(request)
    const headers = new HttpHeaders({Authorization: `Bearer ${localStorage.getItem(environment.accessTokenKey)}`})
    return this.http.post(`${this.API_URL}/v1/disponibilidade`, request);
  }
}
