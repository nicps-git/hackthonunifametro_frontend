import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/shared/validators/password-match.validator';

@Component({
  selector: 'app-password-redefine',
  templateUrl: './password-redefine.component.html',
  styleUrls: ['./password-redefine.component.css']
})
export class PasswordRedefineComponent implements OnInit{

  passwordForm!: FormGroup;
  isLoading:Boolean = false;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      passwordConfirmation: ["", [Validators.required, passwordMatchValidator('password')]]
    }, { updateOn: "change" })
  }

}
