import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";

import {UserService} from "../../../user.service";
import {URL} from '../../../../../api/url';
import {Phone} from "../../../../../pages/portal/profile/phone";
import {EMAIL_PATTERN} from "../../../../../helpers/regex/regex";
import {Email} from "../../../../../pages/portal/profile/email";


@Component({
    selector: 'contact-mail',
    templateUrl: './contact-mail.template.html',
    styleUrls: [
        '../../../../../styles/portal-section-header.less',
        '../contact.less'
    ]
})


export class ContactMail implements OnInit {
    @Input() contact: Email;

    @Output() deleteEmailEvent = new EventEmitter();
    @Output() updateEmailEvent = new EventEmitter();

    emailForm: FormGroup;
    email: Email;
    edit: boolean = false;
    errorMessage: any;

    badPhoneValue: boolean;

    constructor(private fb: FormBuilder,
                private userService: UserService) {
    }

    ngOnInit() {
        this.email = this.contact;

        this.emailForm = this.fb.group({
            email: [this.email ? this.email.email : '', [Validators.pattern(EMAIL_PATTERN)]]
        });
    }

    changeView() {
        this.edit = !this.edit;
    }

    deleteEmail() {
        this.userService.deleteUserEmail(this.email)
            .subscribe(res => {
                this.deleteEmailEvent.next(this.email);
            });
    }

    changeEmail({value, valid}: { value: Email, valid: boolean }) {
        let newMail = {
            ...this.email,
            ...value
        };

        if(valid){
            this.userService.changeUserEmail(newMail)
                .subscribe(
                    res => {
                        this.email = newMail;
                        this.changeView();
                    },
                    error => this.errorMessage = <any>error
                );
        }

    }


}
