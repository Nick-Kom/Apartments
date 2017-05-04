import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'main-search-filter',
    templateUrl: './main-search-filter.template.html',
    styleUrls: [
        '../../styles/forms.less',
        './main-search-filter.less'
    ]
})

export class MainSearchFilter implements OnInit {
    minDate: string;
    searchForm: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router) {
    }

    ngOnInit() {
        this.minDate = this.currentDate();
        this.searchForm = this.fb.group({
            country: [''],
            city: [''],
            checkIn: [''],
            checkOut: [''],
            rooms: [''],
            fromPrice: [null]
        });
    }

    formHandler({value}: {value: any}) {
        let query = {};
        for (let key in value) {
            let paramVal = value[key];
            if (paramVal) {
                query[key] = paramVal
            }
        }
        this.router.navigate(['/public/search'], {queryParams: query});
    }

    currentDate(): string {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        return mm + '-' + dd + '-' + yyyy;
    }
}
