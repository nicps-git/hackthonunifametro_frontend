import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMedico } from '../../model/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
private url: string = 'http://localhost:8081/v1/medico';
  constructor(private http:HttpClient) {}

  medicoByEspecialidade(idEspecialidade: string): Observable<ResponseMedico>{
    return this.http.get<ResponseMedico>(`${this.url}/byEspecialidade?idEspecialidade=${idEspecialidade}&orderBy=nome`)
  }
}
