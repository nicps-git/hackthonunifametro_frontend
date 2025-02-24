import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(passwordControlName: string): ValidatorFn {
  return (confirmPasswordControl: AbstractControl): ValidationErrors | null => {
    if (!confirmPasswordControl.parent) {
      return null;
    }

    const passwordControl = confirmPasswordControl.parent.get(passwordControlName);
    const confirmPassword = confirmPasswordControl.value;

    if (!passwordControl) {
      return null;
    }

    const password = passwordControl.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}
