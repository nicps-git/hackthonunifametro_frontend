import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyAgendamento, ReponseAgendamentosPorPaciente } from '../../model/agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
private url: string = 'http://localhost:8081/v1/agendamento';
  constructor(private http:HttpClient) {}

  agendamento(body: BodyAgendamento): Observable<any>{
    return this.http.post<any>(`${this.url}/`, body)
  }

  agendamentosPorPaciente(idUser: string): Observable<ReponseAgendamentosPorPaciente[]>{
    return this.http.get<ReponseAgendamentosPorPaciente[]>(`${this.url}/paciente?idPaciente=${idUser}`)
  }

  agendamentosPorMedico(idUser: string): Observable<any>{
    return this.http.get<any>(`${this.url}/medico?idMedico=${idUser}`)
  }


  cancelarAgendamento(idAgendamento : string): Observable<ReponseAgendamentosPorPaciente[]>{
    const body = {
      idAgendamento: idAgendamento,
      observacao: `cancelado por paciente ${idAgendamento}`
    }
    return this.http.post<ReponseAgendamentosPorPaciente[]>(`${this.url}/cancelar`, body)
  }
}
