import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { PasswordRedefineComponent } from './password-redefine/password-redefine.component';
import { RegisterComponent } from './register/register.component';

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
    },
    {
      path: 'register',
      component: RegisterComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
