import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {MaterialModule} from "@angular/material";

import {AnnouncementService} from "../announcements-list/announcement.service";
import {AnnouncementAllInfo} from "./announcement-all-info.component";
import {LavsSliderModule} from "../../slider/slider.module";
import {Md2DatepickerModule} from "md2-datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../user/user.service";
import {ScheduleService} from "../../schedule/schedule.service";
import {ConversationService} from "../../message-box/message-box.service";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule,
        Md2DatepickerModule.forRoot(),
        LavsSliderModule
    ],
    declarations: [
        AnnouncementAllInfo
    ],
    providers: [
        AnnouncementService,
        ConversationService,
        UserService,
        ScheduleService
    ],
    exports: [
        AnnouncementAllInfo
    ]
})

export class AnnouncementAllInfoModule {
}