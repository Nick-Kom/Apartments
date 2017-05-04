import {Routes} from '@angular/router';

import {AuthGuard} from "../../guards/auth.guard";
import {Portal} from "./portal.component";
import {Profile} from "./profile/profile.component";
import {MessagesPage} from "./messages/messages.component";
import {AnnouncementsPage} from "./announcements/announcements.component";
import {FavouritesPage} from "./favourites/favourites.component";
import {AnnouncementEditorPage} from "./announcements/announcment-editor/announcement-editor.component";
import {SingleConversationPage} from "./messages/conversation/single-conversation.component";
import {RentedDatesPage} from "./rented-dates/rented-dates-page.component";


export const PortalRoutes: Routes = [
    {
        path: 'portal',
        component: Portal,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'profile',
                pathMatch: 'full'
            },
            {
                path: 'profile',
                component: Profile
            },
            {
                path: 'messages',
                component: MessagesPage
            },
            {
                path: 'messages/:id',
                component: SingleConversationPage
            },
            {
                path: 'favourites',
                component: FavouritesPage
            },
            {
                path: 'announcements',
                component: AnnouncementsPage
            },
            {
                path: 'announcements/edit/:id',
                component: AnnouncementEditorPage
            },
            {
                path: 'announcements/add',
                component: AnnouncementEditorPage
            },
            {
                path: 'announcements/:id/rented-dates',
                component: RentedDatesPage
            }
        ]
    }
];