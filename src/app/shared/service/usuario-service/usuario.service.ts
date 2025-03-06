import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../../model/paciente.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string = 'http://localhost:8081/v1/usuario';

  constructor(private http: HttpClient) {}

  createUsuarioPaciente(paciente: Paciente): Observable<any> {
    return this.http.post<any>(`${this.url}/paciente`, paciente);
  }
}
