import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/service/auth-service/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent {

  form!: FormGroup;
  isLoading: boolean = false;
  countdown: number = 0;
  timer: any;
  isEmailSent:boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  sendRecoveryEmail(){
    this.isLoading = true;

    this.authService.requestResetPassword({email: this.form.get('email')?.value}).subscribe({
      next: (res) => {
        this.snackBar.open(
          "Caso o email informado esteja cadastrado, você receberá um email com as instruções para redefinir sua senha.",
          undefined, {duration: 3000});
          this.isLoading = false;
          this.isEmailSent = true;
          this.startCountdown();
      },
      error: (err) => {
        let errorMessage:string = ""
        if(err.status === 0){
          errorMessage = "Serviço temporariamente indisponível";
        }
        else if(err.status === 422){
          err.error.error.validation.forEach((element:any) => {
            errorMessage += (element.message + " ");
          });
        }
        else {
          errorMessage = err.error.error.message;
        }
        this.snackBar.open(errorMessage, undefined, {duration: 10000});
        this.isLoading = false;
      }
    })
  }

  startCountdown() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.countdown = 90;

    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }
}
