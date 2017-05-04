import {Component, OnInit} from '@angular/core';
import {MapTypeStyle} from "angular2-google-maps/core";
import {MAP_STYLES} from "../../api/google-maps/google-map-styles";

@Component({
    selector: 'search-map',
    templateUrl: 'search-map.template.html',
    styleUrls: ['search-map.less']
})

export class SearchMap implements OnInit{
    lat: number;
    lng: number;
    zoom: number;
    mapStyles: MapTypeStyle[] =  MAP_STYLES;
    marker: any = require('../../assets/img/marker.png') ;


    constructor() {}

    ngOnInit() {
        this.getLocation();
    }

    getLocation() {
        if (navigator.geolocation) {

            return navigator.geolocation.getCurrentPosition(res => {
                const COORDS = res.coords;

                this.lat = COORDS.latitude;
                this.lng = COORDS.longitude;
                this.zoom = 13;
            },
                err => {
                if(err.message.indexOf("Only secure origins are allowed") == 0) {
                    alert(err.message);
                }
            });
        }
        else {
            this.zoom = 9;
            this.lat = 49.431935;
            this.lng = 32.083483;
        }
    }

}
