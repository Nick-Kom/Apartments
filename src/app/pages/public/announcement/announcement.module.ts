import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import {AnnouncementPublicPage} from "./announcement.component";
import {AnnouncementAllInfoModule} from "../../../components/announcements/announcement-all-info/announcement-all-info.module";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        AnnouncementAllInfoModule
    ],
    declarations: [
        AnnouncementPublicPage
    ],
    providers: [],
    exports: [
        AnnouncementPublicPage
    ]
})

export class AnnouncementPublicPageModule {
}