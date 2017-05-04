import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {SearchMap} from "./search-map.component";
import {GOOGLE_MAP_API_KEY} from "../../api/google-maps/google-map-key";
import {AgmCoreModule} from "angular2-google-maps/core";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        AgmCoreModule.forRoot({
            apiKey: GOOGLE_MAP_API_KEY
        })
    ],
    declarations: [
        SearchMap
    ],
    providers: [],
    exports: [
        SearchMap
    ]
})

export class SearchMapModule {}