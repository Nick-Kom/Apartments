import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';

import {RentedDatesPage} from "./rented-dates-page.component";
import {ScheduleComponentModule} from "../../../components/schedule/schedule.module";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ScheduleComponentModule
    ],
    declarations: [
        RentedDatesPage
    ],
    providers: [],
    exports: [
        RentedDatesPage
    ]
})

export class RentedDatesPageModule {}