import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';


import {Message} from "./message";
import {URL} from '../../api/url';

const API = `${URL()}api/v1/`;

@Injectable()
export class MessageService {
    private apiUrlMessage = `${API}messages`;
    private apiUrlConversations = `${API}conversations `;
    private subject = new Subject<any>();

    constructor(private http: Http) {
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
            return new RequestOptions({headers: headers});
        }
    }

    getMessages(id: number) {
        return this.http.get(`${this.apiUrlMessage}/${id}/messages`, this.jwt())
            .map((res: any) => {
                return  res.json()
            });
    }

    createNewMessage(message: string, id: number) {
        let options = this.jwt();
        let obj = {
            'text': message
        };
        let url = `${this.apiUrlMessage}/${id}/messages`;
        return this.http.post(url, obj, options)
            .map((data: any) => {
                return data
            });
    }

    private handleError(error: any) {
        console.error('Error occured', error);
        return Observable.throw(error.message || error);
    }
}