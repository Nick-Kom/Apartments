import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {SearchResult} from "./search-result.component";
import {AnnouncementItemModule} from "../announcements/announcement-item/announcement-item.module";
import {AnnouncementService} from "../announcements/announcements-list/announcement.service";
import {MdButtonModule} from "@angular/material";
import {InfiniteScrollerDirective} from "../../../directives/infinite-scroll/infinite-scroll";



@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        AnnouncementItemModule,
        MdButtonModule,
    ],
    declarations: [
        SearchResult,
        InfiniteScrollerDirective
    ],
    providers: [
        AnnouncementService
    ],
    exports: [
        SearchResult
    ]
})

export class SearchResultModule {}