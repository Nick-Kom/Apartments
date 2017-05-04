import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {Subscription} from "rxjs";

import {UserService} from "../user.service";
import {URL} from '../../../api/url';
import {User} from "../../../pages/portal/profile/user";
import {FileUploadService} from "../../file-upload/file-upload.service";
import {Email} from "../../../pages/portal/profile/email";
import {Phone} from "../../../pages/portal/profile/phone";
import {PHONE_PATTERN, EMAIL_PATTERN} from "../../../helpers/regex/regex";

@Component({
    selector: 'contact-info',
    templateUrl: 'contact-info.template.html',
    styleUrls: [
        '../../../styles/forms.less',
        '../../../styles/portal-section-header.less',
        'contact-info.less'
    ]
})

export class ContactInfo implements OnInit {
    emailForm: FormGroup;
    phoneForm: FormGroup;

    phones: Phone[];
    emails: Email[];
    user: User;

    errorMessage: string;
    avatar: string;
    badEmailValue: boolean;
    badPhoneValue: boolean;

    constructor(private fb: FormBuilder,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getDataPhones().subscribe(
            phones => {
                this.phones = phones;
            },
            error => this.errorMessage = <any>error);

        this.userService.getDataEmails().subscribe(
            emails => {
                this.emails = emails;
            },
            error => this.errorMessage = <any>error);

        this.emailForm = this.fb.group({
            email: ['', [Validators.pattern(EMAIL_PATTERN)]]
        });

        this.phoneForm = this.fb.group({
            phone: ['', [Validators.pattern(PHONE_PATTERN)]]
        });
    }

    deletePhone(phone: Phone) {
        this.phones = this.phones.filter(item => item.id !== phone.id);
    }

    addEmailForm({value, valid}: {value: any, valid: boolean}) {
        if (this.emails.find(item => item.email === value.email)) {
            this.badEmailValue = true;
            return;
        }
        else if (valid) {
            this.badEmailValue = false;
            this.userService.createNewEmailForm(value.email)
                .subscribe(
                    email => {
                        this.emails.push(email);
                        this.emailForm.reset();
                    },
                    error => this.errorMessage = <any>error,
                );
        }
    }

    addPhoneForm({value, valid}: {value: any, valid: boolean}) {
        let isTelephoneNotUnique = this.phones.find(item =>
            item.telephone === value.phone
        );

        if (isTelephoneNotUnique) {
            this.badPhoneValue = true;
            return;
        }

        if (valid) {
            this.badPhoneValue = false;
            this.userService.createNewPhoneForm(value.phone)
                .subscribe(
                    phone => {
                        this.phones.push(phone);
                        this.phoneForm.reset()
                    },
                    error => this.errorMessage = <any>error,
                );
        }
    }

    deleteEmail(email: Email) {
        this.emails = this.emails.filter(item => item.id !== email.id)
    }
}
