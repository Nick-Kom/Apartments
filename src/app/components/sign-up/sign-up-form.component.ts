import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../user/user.service";
import {ISignUp} from './sign-up'
import {PASSWORD_PATTERN, EMAIL_PATTERN} from "../../helpers/regex/regex";
import {PASSWORD_MATCHER} from "../../helpers/validator/equal-validator";


@Component({
    selector: 'sign-up-form',
    templateUrl: 'sign-up-form.template.html',
    styleUrls: ['sign-up-form.less']
})

export class SignUpForm implements OnInit {
    signUpForm: FormGroup;
    loading = false;
    success = false;
    emailExist = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.signUpForm = this.fb.group({
            firstName: ['', [Validators.maxLength(35)]],
            lastName: ['', [Validators.maxLength(35)]],
            email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN), Validators.maxLength(35)]],
            password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN), Validators.maxLength(35)]],
            confirmPassword: ['', [Validators.required, Validators.maxLength(35)]],
            termsChecked: [false, [Validators.requiredTrue]]
        }, { validator: PASSWORD_MATCHER })
    }

    doSignUp({value, valid}: { value: ISignUp, valid: boolean }): void {
        this.loading = true;

        this.userService.create(value)
            .subscribe(
                data => {
                    if(data.ok){
                        this.success = true;
                    }
                },
                error => {
                    console.log(error);
                    this.emailExist = true;
                    this.loading = false;
                });
    }
}
