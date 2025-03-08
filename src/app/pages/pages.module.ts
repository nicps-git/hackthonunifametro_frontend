import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HomeComponent } from './agendamento/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LoginComponent } from './auth/login/login.component';
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component';
import { PasswordRedefineComponent } from './auth/password-redefine/password-redefine.component';
import { RegisterComponent } from './auth/register/register.component';
import { AgendamentosPacienteComponent } from './agendamento/agendamentos-paciente/agendamentos-paciente.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    PasswordRecoveryComponent,
    PasswordRedefineComponent,
    RegisterComponent,
    AgendamentosPacienteComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    AgendamentoModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    SharedModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxMaskDirective,
  ],
  exports: [],
  providers: [provideNgxMask()],
})
export class PagesModule {}
