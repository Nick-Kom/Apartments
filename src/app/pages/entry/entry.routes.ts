import {Routes} from '@angular/router';

import {EntryPage} from "./entry.component";
import {SignIn} from "../public/sign-in/sign-in.component";
import {SignUp} from "../public/sign-up/sign-up.component";

export const EntryRoutes: Routes = [
    {
        path: 'entry',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    },
    {
        path: '',
        component: EntryPage,
        children: [
            {
                path: 'sign-in',
                component: SignIn
            },
            {
                path: 'sign-up',
                component: SignUp
            }
        ]
    }
];