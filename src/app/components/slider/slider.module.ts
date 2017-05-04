import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {LavsSlider} from "./slider.component";


@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        LavsSlider
    ],
    providers: [
    ],
    exports: [
        LavsSlider
    ]
})

export class LavsSliderModule {}
