import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthService) {}

  logout(): void {
    localStorage.clear(); // Remove o token
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }


  get isAuthenticated(): boolean {
    return !! this.authService.isAuthenticated(); // Retorna true se o token existir
  }

  get perfilUser(): string {
    return this.authService.perfilUser(); // Retorna true se o token existir
  }

  navigate(url:string){
    this.router.navigate([url]);
  }
}
