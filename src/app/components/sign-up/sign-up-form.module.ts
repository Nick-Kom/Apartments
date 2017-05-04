import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {SignUpForm} from "./sign-up-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../user/user.service";
import {HttpModule} from "@angular/http";
import {MdInputModule, MdButtonModule, MdCheckboxModule} from "@angular/material";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        HttpModule,
        MdButtonModule,
        MdInputModule,
        MdCheckboxModule
    ],
    declarations: [
        SignUpForm,
    ],
    providers: [
        UserService
    ],
    exports: [
        SignUpForm
    ]
})

export class SignUpFormModule {}