import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientModule } from './patient/patient.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PatientModule,
    ],
  exports: [ ]
})
export class PagesModule { }
