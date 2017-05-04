import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import {MainSearchModule} from "./main-search/main-search.module";
import {HeaderModule} from "../../components/layout/header/header.module";
import {PublicPage} from "./public.component";

import {SignInModule} from "./sign-in/sign-in.module";
import {SignUpModule} from "./sign-up/sign-up.module";
import {AnnouncementPublicPageModule} from "./announcement/announcement.module";
import {FooterModule} from "../../components/layout/footer/footer.module";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        MainSearchModule,
        HeaderModule,
        SignInModule,
        SignUpModule,
        AnnouncementPublicPageModule,
        FooterModule
    ],
    declarations: [
        PublicPage
    ],
    providers: [],
    exports: [
        PublicPage,
        MainSearchModule,
        HeaderModule
    ]
})

export class PublicPageModule {
}