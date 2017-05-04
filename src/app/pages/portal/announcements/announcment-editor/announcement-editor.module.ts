import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {AnnouncementEditorModule} from "../../../../components/announcements/announcement-editor/announcement-editor.module";
import {AnnouncementEditorPage} from "./announcement-editor.component";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        AnnouncementEditorModule
    ],
    declarations: [
        AnnouncementEditorPage
    ],
    providers: [],
    exports: [
        AnnouncementEditorPage
    ]
})

export class AnnouncementEditorPageModule {}