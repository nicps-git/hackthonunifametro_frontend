import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  async sendRecoveryEmail(){
    this.isLoading = true;

    await new Promise(resolve => setTimeout(resolve, 3000));

    this.snackBar.open("Email enviado com sucesso!", undefined, 
    {
      duration: 3000
    })
    this.isLoading = false;
    this.isEmailSent = true;
    this.startCountdown();
  }

  startCountdown() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.countdown = 10;

    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }
}
