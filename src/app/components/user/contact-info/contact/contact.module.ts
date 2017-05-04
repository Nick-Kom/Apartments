import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";

import {UserService} from "../../user.service";
import {ContactPhone} from "./phone/contact-phone.component";
import {ContactMail} from "./mail/contact-mail.component";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        ContactPhone,
        ContactMail
    ],
    providers: [
        UserService,
    ],
    exports: [
        ContactPhone,
        ContactMail
    ]
})

export class ContactModule {}
