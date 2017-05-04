import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {Header} from "./header.component";
import {AuthService} from "../../../services/auth.service";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
    ],
    declarations: [
        Header
    ],
    providers: [
        AuthService
    ],
    exports: [
        Header
    ]
})

export class HeaderModule {
}