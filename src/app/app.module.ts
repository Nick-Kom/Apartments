import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { appRouting } from "./app.routes";

import { AppComponent } from './app.component';
import {PortalModule} from "./pages/portal/portal.module";

import {AuthService} from "./services/auth.service";

import {PublicPageModule} from "./pages/public/public.module";
import {AgmCoreModule} from "angular2-google-maps/core";
import {GOOGLE_MAP_API_KEY} from "./api/google-maps/google-map-key";
import {EmailVerifyModule} from "./components/email-verify/email-verify.module";
import {UserService} from "./components/user/user.service";
import {EntryPageModule} from "./pages/entry/entry.module";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        appRouting,
        PublicPageModule,
        PortalModule,
        EntryPageModule,
        EmailVerifyModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        AuthService,
        UserService
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}
