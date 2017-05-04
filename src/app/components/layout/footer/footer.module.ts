import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {Footer} from "./footer.component";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
    ],
    declarations: [
        Footer
    ],
    providers: [],
    exports: [
        Footer
    ]
})

export class FooterModule {}