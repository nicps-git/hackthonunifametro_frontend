import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseEspecialidades } from '../../model/especialidade.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {
  private url: string = 'http://localhost:8081/v1/especialidade';
  constructor(private http:HttpClient) {}

  getEspecialidadeAll(): Observable<ResponseEspecialidades>{
    return this.http.get<ResponseEspecialidades>(`${this.url}/all?orderBy=nome`)
  }

}
