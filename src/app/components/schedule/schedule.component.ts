import {Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import 'fullcalendar';
import {MdDialog} from "@angular/material";
import {Params, ActivatedRoute} from "@angular/router";
import {ScheduleService} from "./schedule.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";


@Component({
    selector: 'schedule-dates',
    templateUrl: 'schedule.template.html',
    styleUrls: [
        './schedule.less'
    ]
})

export class ScheduleComponent implements OnInit {
    panelActive: boolean = false;
    requests: any[];
    requestForm: FormGroup;
    announcementId: number;
    header: any;
    date: string = null;
    request: BookingRequest;
    routeParams: Params = this.route.params;
    minDate: string = this.currentDate();
    idGen: number = 100;

    @ViewChild('dateControl') el: ElementRef;


    constructor(private cd: ChangeDetectorRef,
                private bookingService: ScheduleService,
                private fb: FormBuilder,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.routeParams.subscribe((params: Params) => this.announcementId = +params['id']);
        this.bookingService.getEvents(this.announcementId).subscribe(
            res => {
                this.requests = res;
                console.log(this.requests);

            }
        );

        this.header = {
            left: 'prev',
            center: 'title',
            right: 'next'
        };

        this.createForm();
    }

    createForm() {
        this.requestForm = this.fb.group({
            checkIn: ['', [Validators.required]],
            checkOut: ['', [Validators.required]],
            comment: '',
            approved: false
        })
    }

    closePanel() {
        this.panelActive = false;
    }

    handleDayClick(request: any) {
        this.request = new BookingRequest();
        this.request.checkIn = request.date.format();
        this.requestForm.setValue(this.request);
        this.openPanel();
    }

    handleEventClick(request: any) {
        this.request = new BookingRequest();

        let start = request.calEvent.start;
        let end = request.calEvent.end;

        if (request.view.name === 'month') {
            start.stripTime();
        }

        if (end) {
            end.stripTime();
        }

        this.request.id = request.calEvent.id;
        this.request.comment = request.calEvent.title;
        this.request.checkIn = start.format();
        this.request.checkOut = end.format();
        this.request.approved = request.calEvent.approved;
        this.requestForm.patchValue(this.request);

        this.openPanel();
    }

    saveEvent({value, valid}: { value: any, valid: boolean }): void {

        if (this.request.id) {
            this.bookingService.upadateRequest({
                id: this.request.id,
                ...value
            }, this.announcementId).subscribe(
                (res:any) => {
                    let body: BookingRequest = value;

                    this.requests = [...this.requests.filter(item => item.id !== body.id),
                        {
                            start: new Date(body.checkIn),
                            end: new Date(body.checkOut),
                            id: value.id,
                            title: body.comment,
                            approved: body.approved,
                            backgroundColor: body.approved ? '#7bdb6c' : '#bebebe'
                        }
                    ];
                    this.closePanel();
                }
            );
        }
        else {
            this.bookingService.createRequest({
                    ...value
                },
                this.announcementId).subscribe(
                (res: any) => {
                    let body: BookingRequest = res.json();

                    this.requests.push({
                        start: new Date(body.checkIn),
                        end: new Date(body.checkOut),
                        id: body.id,
                        title: body.comment,
                        approved: body.approved,
                        backgroundColor: body.approved ? '#7bdb6c' : '#bebebe'
                    });
                    this.closePanel();
                }
            );
        }
    }

    deleteRequest() {
        this.bookingService.deleteRequest(this.request.id).subscribe(
            res => {
                console.log(res);
                this.requests = this.requests.filter((item: BookingRequest) =>
                {
                    return item.id !== this.request.id
                });

                this.closePanel()
            }
        );
    }

    currentDate(): string {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();

        return mm+'-'+dd+'-'+yyyy;
    }

    openPanel() {
        this.panelActive = true;
    }
}

export class BookingRequest {
    id?: number;
    comment: string = '';
    checkIn: string = null;
    checkOut: string = null;
    approved: boolean = false;
}

