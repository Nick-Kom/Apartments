import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import {FileUploadComponent} from "./file-upload.component";
import {FileUploadService} from "./file-upload.service";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule
    ],
    declarations: [
        FileUploadComponent
    ],
    providers: [
        FileUploadService
    ],
    exports: [
        FileUploadComponent
    ]
})

export class FileUploadModule {}