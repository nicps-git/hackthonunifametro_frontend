import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyAgendamento } from '../../model/agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
private url: string = 'http://localhost:8081/v1/agendamento';
  constructor(private http:HttpClient) {}

  agendamento(body: BodyAgendamento): Observable<any>{
    return this.http.post<any>(`${this.url}/`, body)
  }
}
