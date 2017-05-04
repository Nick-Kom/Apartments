import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'main-search',
    templateUrl: 'main-search.template.html',
    styleUrls: ['./main-search.less']
})

export class MainSearch {
    backgroundImg:any;


    constructor(private sanitizer:DomSanitizer) {
        this.backgroundImg = sanitizer.bypassSecurityTrustStyle('url(../../assets/img/1.jpg)')
    }
}
