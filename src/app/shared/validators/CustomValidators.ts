import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const passwordMissmatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control?.get('password');
  const passwordConfirmation = control?.get('passwordConfirm');
  return  password?.value === passwordConfirmation?.value ?  null : {passwordMissmatch:  true};
};
