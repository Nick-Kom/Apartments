import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {AnnouncementItem} from "./announcement-item.component";
import {MaterialModule} from "@angular/material";
import {AlertConfirmDeleting} from "../../modals/alert-confirm/alert-confirm-deleting";
import {LavsSliderModule} from "../../slider/slider.module";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        MaterialModule,
        LavsSliderModule
    ],
    declarations: [
        AnnouncementItem,
        AlertConfirmDeleting
    ],
    entryComponents: [AlertConfirmDeleting],
    exports: [
        AnnouncementItem
    ]
})

export class AnnouncementItemModule {
}