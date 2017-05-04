import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormControl} from "@angular/forms";

import {UserService} from "../../../user.service";
import {URL} from '../../../../../api/url';
import {Email} from "../../../../../pages/portal/profile/email";
import {Phone} from "../../../../../pages/portal/profile/phone";
import {PHONE_PATTERN, EMAIL_PATTERN} from "../../../../../helpers/regex/regex";


@Component({
    selector: 'contact-phone',
    templateUrl: 'contact-phone.template.html',
    styleUrls: [
        '../../../../../styles/portal-section-header.less',
        '../contact.less'
    ]
})


export class ContactPhone implements OnInit {
    @Input() contact: Phone;

    @Output() deletePhoneEvent = new EventEmitter();
    @Output() updatePhoneEvent = new EventEmitter();

    phoneForm: FormGroup;
    phone: Phone;
    edit: boolean = false;
    errorMessage: any;

    badPhoneValue: boolean;

    constructor(private fb: FormBuilder,
                private userService: UserService) {
    }

    ngOnInit() {
        this.phone = this.contact;

        this.phoneForm = this.fb.group({
            telephone: [this.phone ? this.phone.telephone : '', [Validators.pattern(PHONE_PATTERN)]]
        });
    }

    changeView() {
        this.edit = !this.edit;
    }

    deletePhone() {
        this.userService.deleteUserPhone(this.phone)
            .subscribe(res => this.deletePhoneEvent.next(this.phone));
    }

    changePhone({value, valid}: { value: Phone, valid: boolean }) {
        let newPhone = {
            id: this.phone.id,
            telephone: value.telephone
        };

        if (valid) {
            this.userService.changeUserPhone(newPhone)
                .subscribe(
                    res => {
                        this.phone = newPhone;
                        this.changeView();
                    },
                    error => this.errorMessage = <any>error
                );
        }
    }
}
