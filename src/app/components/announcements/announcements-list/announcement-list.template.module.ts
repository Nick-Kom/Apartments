import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {AnnouncementList} from "./announcement-list.template.component";
import {AnnouncementService} from "../announcements-list/announcement.service";

import {AnnouncementItemModule} from "../announcement-item/announcement-item.module";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        AnnouncementItemModule
    ],
    declarations: [
        AnnouncementList
    ],
    providers: [
        AnnouncementService
    ],
    exports: [
        AnnouncementList
    ]
})

export class AnnouncementListModule {
}