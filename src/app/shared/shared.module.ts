import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FrameComponent } from './components/frame/frame.component';



@NgModule({
  declarations: [
    FrameComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    FrameComponent
  ]
})
export class SharedModule { }
