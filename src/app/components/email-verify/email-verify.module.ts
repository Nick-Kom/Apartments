import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import {EmailVerifyService} from "./email-verify.service";
import {EmailVerify} from "./email-verify.component";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
    ],
    declarations: [
        EmailVerify
    ],
    providers: [
        EmailVerifyService
    ],
    exports: [
        EmailVerify
    ]
})

export class EmailVerifyModule {}