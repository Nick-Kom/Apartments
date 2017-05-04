import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {
    MdCheckboxModule, MdInputModule, MdSliderModule, MdButtonModule, MdSelectModule,
    MdTabsModule
} from "@angular/material";
import {Md2DatepickerModule} from "md2-datepicker";
import {MainSearchFilter} from "./main-search-filter.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        MdCheckboxModule,
        MdInputModule,
        MdSliderModule,
        MdButtonModule,
        MdSelectModule,
        MdTabsModule,
        Md2DatepickerModule.forRoot(),
    ],
    declarations: [
        MainSearchFilter
    ],
    providers: [],
    exports: [
        MainSearchFilter
    ]
})

export class MainSearchFilterModule {}