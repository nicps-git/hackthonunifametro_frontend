import { CanActivateChildFn } from '@angular/router';
import { environment } from 'src/environments/environment';

export const RoleGuard: CanActivateChildFn = (childRoute, state) => {
  const requiredRoles = childRoute.data?.['roles'] as string[];
  if(requiredRoles.length === 0){
    return true;
  }

  const userRole = localStorage.getItem(environment.userRoleKey);

  if(!userRole){
    return false;
  }

  if (requiredRoles.includes(userRole)) {
    return true;
  }
  return false;
};
