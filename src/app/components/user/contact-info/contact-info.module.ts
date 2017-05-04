import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";

import {UserService} from "../user.service";
import {ContactInfo} from "./contact-info.component";
import {ContactModule} from "./contact/contact.module";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule,
        ContactModule
    ],
    declarations: [
        ContactInfo
    ],
    providers: [
        UserService,
    ],
    exports: [
        ContactInfo
    ]
})

export class ContactInfoModule {}