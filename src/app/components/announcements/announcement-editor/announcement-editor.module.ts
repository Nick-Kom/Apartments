import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {MaterialModule} from "@angular/material";
import {AnnouncementEditor} from "./announcement-editor.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FileUploadModule} from "../../file-upload/file-upload.module";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule,
        FileUploadModule
    ],
    declarations: [
        AnnouncementEditor
    ],
    providers: [],
    exports: [
        AnnouncementEditor
    ]
})

export class AnnouncementEditorModule {}