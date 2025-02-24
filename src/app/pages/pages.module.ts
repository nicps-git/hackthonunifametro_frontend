import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientModule } from './patient/patient.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthModule
    ],
  exports: [ ]
})
export class PagesModule { }
