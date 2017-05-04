import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule}   from '@angular/router';
import {MessageBox} from "./message-box.component";
import {MaterialModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TruncatePipe} from "./truncate-pipe";



@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
    ],
    declarations: [
        MessageBox,
        TruncatePipe
    ],
    providers: [],
    exports: [
        MessageBox
    ]
})

export class MessageBoxModule {}