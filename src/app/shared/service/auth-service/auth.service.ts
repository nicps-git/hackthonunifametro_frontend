import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'accessToken';

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  logIn(request: { user: string; password: string }) {
    return this.http.post<{ data: { token: string } }>(
      `${this.API_URL}/v1/login`,
      request
    );
  }

  requestResetPassword(request: { email: string }) {
    return this.http.post(
      `${this.API_URL}/v1/login/requestResetPassword`,
      request
    );
  }

  resetPassword(request: { code: string; password: string }) {
    return this.http.post(`${this.API_URL}/v1/login/resetPassword`, request);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token !== null; // Aqui você pode implementar lógica para verificar a validade do token
  }

  perfilUser(): string {
    const token = localStorage.getItem(this.tokenKey)?.toString();
    if (token) {
      const decodedToken: { perfil: string } = jwtDecode(token);
      return decodedToken.perfil;
    } else {
      return '';
    }
  }

  idUser(): string {
    const token = localStorage.getItem(this.tokenKey)?.toString();
    if (token) {
      const decodedToken: { idUser: string } = jwtDecode(token);
      return decodedToken.idUser;
    } else {
      return '';
    }
  }
}
