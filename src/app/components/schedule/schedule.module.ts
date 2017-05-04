import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {MaterialModule} from "@angular/material";

import {ScheduleModule} from 'primeng/primeng';

import {ScheduleComponent} from "./schedule.component";
import {ScheduleService} from "./schedule.service";
import {ReactiveFormsModule} from "@angular/forms";
import {Md2DatepickerModule} from "md2-datepicker";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        ScheduleModule,
        Md2DatepickerModule.forRoot(),
    ],
    declarations: [
        ScheduleComponent,
    ],
    providers: [
        ScheduleService
    ],
    exports: [
        ScheduleComponent
    ]
})

export class ScheduleComponentModule {}