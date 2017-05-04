import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {ForgotPassForm} from "./forgot-pass-form.component";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
    ],
    declarations: [
        ForgotPassForm
    ],
    providers: [],
    exports: [
        ForgotPassForm
    ]
})

export class ForgotPassFormModule {}