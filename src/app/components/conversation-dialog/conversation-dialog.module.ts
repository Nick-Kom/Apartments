import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule}   from '@angular/router';
import {ConversationDialog} from "./conversation-dialog.component";
import {MaterialModule} from "@angular/material";
import {MessageService} from "./conversation-dialog.service";
import {ConversationService} from "../message-box/message-box.service";



@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        ConversationDialog
    ],
    providers: [
        MessageService,
        ConversationService
    ],
    exports: [
        ConversationDialog
    ]
})

export class ConversationDialogModule {}