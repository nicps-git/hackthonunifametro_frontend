import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './shared/guards/role.guard';

const routes: Routes = [
  { 
    path: 'auth', 
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) 
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'agendamento',
    loadChildren: () => import('./pages/agendamento/agendamento.module').then(m => m.AgendamentoModule),
    canActivate: [AuthGuard],
    data: {roles: ["Paciente"]},
    
  },
  {
    path:'medico',
    loadChildren: () => import('./pages/doctor/doctor.module').then(m => m.DoctorModule),
    canActivateChild: [RoleGuard, AuthGuard],
    data: {roles: ["Médico", "Admin", 'Gerente']},
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
