import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import { FavouritesPage } from "./favourites.component";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
    ],
    declarations: [
        FavouritesPage
    ],
    providers: [],
    exports: [
        FavouritesPage
    ]
})

export class FavouritesPageModule {}