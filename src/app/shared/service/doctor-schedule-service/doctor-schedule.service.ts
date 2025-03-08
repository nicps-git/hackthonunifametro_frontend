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
    const headers = new HttpHeaders({Authorization: `Bearer ${localStorage.getItem(environment.accessTokenKey)}`})
    return this.http.post(`${this.API_URL}/v1/disponibilidade`, request);
  }

  getSchedule(idMedico:string, page = 1, perPage = 10){
    return this.http.get<{data:{diaSemana:string, horario:string}[]}>(`${this.API_URL}/v1/disponibilidade/all`,{params:{
      idMedico,
      page,
      perPage
    }})
  }

  removeFromSchedule(idMedico:string, diaSemana:string, hora:string){
    return this.http.delete(`${this.API_URL}/v1/disponibilidade/hour`, {params: {
      idMedico, diaSemana, hora
    }})
  }
}
