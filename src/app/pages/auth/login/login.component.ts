import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth-service/auth.service';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  isLoading: Boolean = false;
  hidePassword = true;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService, 
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginRequest = () => {
    this.isLoading = true;
    const loginRequest = {
      user: this.loginForm.get('username')?.value.replace(/\D/g, ''),
      password: this.loginForm.get('password')?.value
    }
    this.authService.logIn(loginRequest).subscribe({
      next: (res) => {
        this.isLoading = false;
        const token = res.data.token;
        const decodedToken:{idUser:string, perfil:string} = jwtDecode(token);
        localStorage.setItem(environment.userRoleKey, decodedToken.perfil);
        localStorage.setItem(environment.userIdKey, decodedToken.idUser);
        localStorage.setItem(environment.accessTokenKey, token);

        if(decodedToken.perfil === "Paciente"){
          this.router.navigate(['/agendamento/home'])
        } 
        else{
          this.router.navigate(['/medico/home'])
        }
      },
      error: (err) => {
        let errorMessage = "";
        if(err.status === 0){
          errorMessage = "Sistema temporatiamente indisponível";
        }
        else if(err.status === 400){
          errorMessage = err.error.error.message;
        }
        else {
          errorMessage = err.message;
        }
        this.snackBar.open(errorMessage, undefined, {duration: 3000});
        this.isLoading = false;
      },
    })
  }

  navigateToRecoveryPassword(){
    this.router.navigate(['/auth/recovery-password']);
  }

  navigateToRegister(){
    this.router.navigate(['/auth/register']);
  }
}
