import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {MdButtonModule} from "@angular/material";
import {RouterModule}   from '@angular/router';

import {SignUp} from "./sign-up.component";
import {SignUpFormModule} from "../../../components/sign-up/sign-up-form.module";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        SignUpFormModule,
        MdButtonModule
    ],
    declarations: [
        SignUp
    ],
    providers: [],
    exports: [
        SignUp
    ]
})

export class SignUpModule {}