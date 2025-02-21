import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PasswordRedefineComponent } from './pages/password-redefine/password-redefine.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    PasswordRecoveryComponent,
    PasswordRedefineComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    SharedModule
  ]
})
export class AuthModule { }
