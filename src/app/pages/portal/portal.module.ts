import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import { Portal } from "./portal.component";
import {SidebarModule} from "../../components/layout/sidebar/sidebar.module";
import {ProfilePageModule} from "./profile/profile.module";
import {MessagesPageModule} from "./messages/messages.module";
import {AnnouncementsPageModule} from "./announcements/announcements.module";
import {FavouritesPageModule} from "./favourites/favourites.module";
import {AnnouncementEditorPageModule} from "./announcements/announcment-editor/announcement-editor.module";
import {SingleConversationModule} from "./messages/conversation/single-conversation.module";
import {RentedDatesPageModule} from "./rented-dates/rented-dates.module";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        SidebarModule,
        ProfilePageModule,
        MessagesPageModule,
        AnnouncementsPageModule,
        AnnouncementEditorPageModule,
        FavouritesPageModule,
        SingleConversationModule,
        RentedDatesPageModule
    ],
    declarations: [
        Portal
    ],
    providers: [],
    exports: [
        Portal
    ]
})

export class PortalModule {}