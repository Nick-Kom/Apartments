import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import {SingleConversationPage} from "./single-conversation.component";
import {ConversationDialogModule} from "../../../../components/conversation-dialog/conversation-dialog.module";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ConversationDialogModule
    ],
    declarations: [
        SingleConversationPage
    ],
    providers: [],
    exports: [
        SingleConversationPage
    ]
})

export class SingleConversationModule {}