import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import {MainSearch} from "./main-search.component";
import {MainSearchFilterModule} from "../../../components/search-main-filter/main-search-filter.module";
import {SearchMapModule} from "../../../components/search-map/search-map.module";
import {SearchResultModule} from "../../../components/search-result/search-result.module";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        MainSearchFilterModule,
        SearchMapModule,
        SearchResultModule
    ],
    declarations: [
        MainSearch
    ],
    providers: [],
    exports: [
        MainSearch
    ]
})

export class MainSearchModule {}