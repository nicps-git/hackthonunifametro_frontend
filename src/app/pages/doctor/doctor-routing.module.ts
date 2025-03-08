import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SchedulingSettingsComponent } from './scheduling-settings/scheduling-settings.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { RoleGuard } from 'src/app/shared/guards/role.guard';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'configuracao-horario',
    component: SchedulingSettingsComponent,
  },
  {
    path: 'create',
    component: CreateDoctorComponent,
    canActivateChild: [RoleGuard],
    data: { roles: ['Admin', 'Gerente'] },
  },

  {
    path: 'list',
    component: DoctorsListComponent ,
    canActivateChild: [RoleGuard],
    data: { roles: ['Admin', 'Gerente'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
