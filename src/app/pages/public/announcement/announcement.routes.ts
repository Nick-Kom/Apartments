import { Routes } from '@angular/router';
import {AnnouncementPublicPage} from "./announcement.component";


export const AnnouncementPublicRoutes: Routes = [
    {
        path: 'announcement/:id',
        component: AnnouncementPublicPage
    }
];