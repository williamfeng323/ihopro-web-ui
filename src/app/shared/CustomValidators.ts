import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static emailValidator(control: AbstractControl) {
    if (!control.value.match(/^[A-Za-z0-9.+_-]+@[A-Za-z0-9._-]+\.[a-zA-Z]*$/)) {
      return { 'invalidEmailAddress': true };
    }
  }
  static passwordValidator(control: AbstractControl) {
    // password must contain at lest one upper case, one lower case one digit, length from 6 to 20
    if (!control.value.match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/)) {
      return {'invalidPassword': true};
    }
  }
}
