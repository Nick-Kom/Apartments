import {Component, Optional, OnInit} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    template: `
    <div>
        <h2 class="">
            Please mark your apartment on the map or write down manually its latitude and longitude  
        </h2>
        <form formgroup="locationForm">
            <ul class="row">
                <li class="col-6">
                    <md-input-container class="d-block">
                        <input type="number" mdInput placeholder="Living places" formControlName="longitude">
                    </md-input-container>
                </li>
                <li class="col-6">
                    <md-input-container class="d-block">
                        <input type="number" mdInput placeholder="Living places" formControlName="latitude">
                    </md-input-container>
                </li>
            </ul>
        </form>
        
        <button md-button (click)="dialogRef.close({delete: true})">Save</button>
        <button class="btn btn-success" md-button (click)="dialogRef.close()">Close</button>    
    </div>
  `,
    styleUrls: [
        './map-modal.less'
    ]
})

export class MapModal implements OnInit {
    locationForm: FormGroup;

    constructor(@Optional() public dialogRef: MdDialogRef<MapModal>,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.locationForm = this.fb.group({
            longitude: [''],
            latitude: ['']
        })
    }
}