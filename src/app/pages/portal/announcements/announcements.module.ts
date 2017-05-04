import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import { AnnouncementsPage } from "./announcements.component";
import {AnnouncementListModule} from "../../../components/announcements/announcements-list/announcement-list.template.module";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        AnnouncementListModule
    ],
    declarations: [
        AnnouncementsPage
    ],
    providers: [],
    exports: [
        AnnouncementsPage
    ]
})

export class AnnouncementsPageModule {}