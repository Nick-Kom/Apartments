import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PortalRoutes} from "./pages/portal/portal.routes";
import {PublicRoutes} from "./pages/public/public.routes";
import {EmailVerify} from "./components/email-verify/email-verify.component";
import {EntryRoutes} from "./pages/entry/entry.routes";


const appRoutes: Routes = [
    ...PublicRoutes,
    ...PortalRoutes,
    ...EntryRoutes,
    {
        path: 'verify-email',
        component: EmailVerify
    },
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);