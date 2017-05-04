import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {EMAIL_PATTERN, PASSWORD_PATTERN} from "../../helpers/regex/regex";


@Component({
    selector: 'sign-in-form',
    templateUrl: 'sign-in-form.template.html',
    styleUrls: ['sign-in-form.less']
})

export class SignInForm implements OnInit {
    signInForm: FormGroup;
    badEmailValue: boolean;
    badPasswordValue: boolean;


    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.signInForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
            password: ['', [Validators.required]]
        })
    }

    doLogin({value, valid}: { value: any, valid: boolean }): void {
        if (valid) {
            this.authService.login(value.email, value.password)
                .subscribe((res) => {
                        this.router.navigate(['/portal']);
                    },
                    (err: any)=> {
                        if(err.status = 401 && err.error_description.toLowerCase() === 'error password') {
                            this.badPasswordValue = true;
                        }
                        else if (err.status = 401 && err.error_description.toLowerCase() === 'error email'){
                            this.badEmailValue = true;
                        }
                    }
                );

        }
    }
}
