import {Routes} from '@angular/router';

import {PublicPage} from "./public.component";
import {MainSearchRoutes} from "./main-search/main-search.routes";
import {AnnouncementPublicRoutes} from "./announcement/announcement.routes";

export const PublicRoutes: Routes = [
    {
        path: '',
        redirectTo: 'public/search',
        pathMatch: 'full'
    },
    {
        path: 'public',
        component: PublicPage,
        children: [
            {
                path: '',
                redirectTo: 'search',
                pathMatch: 'full'
            },
            ...MainSearchRoutes,
            ...AnnouncementPublicRoutes
        ]
    }
];