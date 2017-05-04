import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import { MessagesPage } from "./messages.component";
import {MessageBoxModule} from "../../../components/message-box/message-box.module";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        MessageBoxModule
    ],
    declarations: [
        MessagesPage
    ],
    providers: [],
    exports: [
        MessagesPage
    ]
})

export class MessagesPageModule {}