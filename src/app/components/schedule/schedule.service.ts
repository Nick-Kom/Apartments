import {Injectable, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {URL} from '../../api/url';
import {Observable} from "rxjs";


const API_BOOKING = `${URL()}api/v1/booking`;


@Injectable()
export class ScheduleService {
    arrEvents: any[];

    constructor(private http: Http) {
    }


    getEvents(announcementId: number) {
        return this.http.get(`${API_BOOKING}/${announcementId}`, this.jwt()).map(
            (res: any) => {
                return res.json().map((item: any) => {

                    let user = item.userInformationBean;
                    let req = item.bookingRequestBean;
                    let title = req.comment ? req.comment : `${user.firstName} ${user.lastName}`.trim();
                    let backgroundColor = req.approved ? '#7bdb6c' : '#bebebe';

                    return {
                        id: req.id,
                        start: new Date(req.checkIn),
                        end: new Date(req.checkOut),
                        idAnnouncement: announcementId,
                        title,
                        approved: req.approved,
                        backgroundColor
                    };
                });
            });
    }

    createRequest(req: any, announcementId: number) {
        return this.http.post(`${API_BOOKING}/${announcementId}`, req, this.jwt());
    }

    upadateRequest(req: any, announcementId: number) {
        return this.http.put(`${API_BOOKING}/${announcementId}`, req, this.jwt());
    }

    deleteRequest(id: number) {
        return this.http.delete(`${API_BOOKING}/${id}`, this.jwt());
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
            return new RequestOptions({headers: headers});
        }
    }
}