import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AgendamentosPacienteComponent } from './agendamentos-paciente/agendamentos-paciente.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'paciente',
    component: AgendamentosPacienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentoRoutingModule {}
