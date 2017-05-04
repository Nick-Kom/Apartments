import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule}   from '@angular/router';

import {SignInForm} from "./sign-in-form.component";
import {MdButtonModule, MdInputModule} from "@angular/material";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        MdButtonModule,
        MdInputModule
    ],
    declarations: [
        SignInForm
    ],
    providers: [],
    exports: [
        SignInForm
    ]
})

export class SignInFormModule {}