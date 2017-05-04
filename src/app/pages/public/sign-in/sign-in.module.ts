import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import {SignIn} from "./sign-in.component";
import {SignInFormModule} from "../../../components/sign-in/sign-in-form.module";
import {AuthGuard} from "../../../guards/auth.guard";
import {MdButtonModule} from "@angular/material";



@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        SignInFormModule,
        MdButtonModule
    ],
    declarations: [
        SignIn
    ],
    providers: [
        AuthGuard
    ],
    exports: [
        SignIn
    ]
})

export class SignInModule {}