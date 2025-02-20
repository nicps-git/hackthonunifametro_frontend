import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { PasswordRedefineComponent } from './pages/password-redefine/password-redefine.component';

const routes: Routes = [
    { 
      path: 'login', 
      component: LoginComponent
    },
    {
      path: 'recovery-password',
      component: PasswordRecoveryComponent
    },
    {
      path: 'new-password',
      component: PasswordRedefineComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
