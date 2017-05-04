import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import {EntryPage} from "./entry.component";
import {SignUpModule} from "../public/sign-up/sign-up.module";
import {SignInModule} from "../public/sign-in/sign-in.module";
import {MdButtonModule} from "@angular/material";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        SignInModule,
        SignUpModule,
    ],
    declarations: [
        EntryPage
    ],
    providers: [],
    exports: [
        EntryPage
    ]
})

export class EntryPageModule {}