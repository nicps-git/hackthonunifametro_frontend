import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

import { FrameComponent } from './components/frame/frame.component';
import { ButtonWithLoadingComponent } from './components/button-with-loading/button-with-loading.component';



@NgModule({
  declarations: [
    FrameComponent,
    ButtonWithLoadingComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  exports: [
    FrameComponent,
    ButtonWithLoadingComponent,
  ]
})
export class SharedModule { }
