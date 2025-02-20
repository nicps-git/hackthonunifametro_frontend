import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';

const routes: Routes = [
    { 
      path: 'login', 
      component: LoginComponent
    },
    {
      path: 'password-recovery',
      component: PasswordRecoveryComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
