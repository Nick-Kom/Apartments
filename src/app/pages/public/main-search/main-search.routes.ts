import { Routes } from '@angular/router';
import {MainSearch} from "./main-search.component";


export const MainSearchRoutes: Routes = [
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
    },
    {
        path: 'search',
        component: MainSearch
    }
];