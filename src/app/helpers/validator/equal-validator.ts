import {AbstractControl} from "@angular/forms";

export const PASSWORD_MATCHER = (control: AbstractControl): {[key: string]: boolean} => {
    let email = control.get('password');
    let confirm = control.get('confirmPassword');


    if (!email || !confirm) return null;
    return email.value === confirm.value ? null : { nomatch: true };
};