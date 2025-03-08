import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SchedulingSettingsComponent } from './scheduling-settings/scheduling-settings.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'configuracao-horario',
    component: SchedulingSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
