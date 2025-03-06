import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth-service/auth.service';
import { passwordMatchValidator } from 'src/app/shared/validators/password-match.validator';

@Component({
  selector: 'app-password-redefine',
  templateUrl: './password-redefine.component.html',
  styleUrls: ['./password-redefine.component.css']
})
export class PasswordRedefineComponent implements OnInit{

  redefinePasswordCode!: string;
  passwordForm!: FormGroup;
  isLoading:Boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private authService:AuthService,
    private snackBar: MatSnackBar,
    private router:Router
  ){}

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      passwordConfirmation: ["", [Validators.required, passwordMatchValidator('password')]]
    }, { updateOn: "change" })

    this.redefinePasswordCode = this.route.snapshot.paramMap.get('code') || '';
  }

  onSubmit(){
    this.authService.resetPassword(
      {
        code: this.redefinePasswordCode, 
        password: this.passwordForm.get('password')?.value
      }
    ).subscribe({
      next: (res) => {
        const snackBarReference = this.snackBar.open("Senha redefinida com sucesso.", "Ir para página inicial");

        snackBarReference.afterDismissed().subscribe(() => {
          this.navigateToInitialPage();
        })
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

  private navigateToInitialPage(){
    this.router.navigate(['/auth/login']);
  }

}
