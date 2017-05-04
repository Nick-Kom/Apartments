import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';


import {Conversation} from "./conversation";
import {URL} from '../../api/url';

const API = `${URL()}api/v1/`;

@Injectable()
export class ConversationService {
    private apiUrlConversation = `${API}conversations`;
    private subject = new Subject<any>();
    private apiUrlConversations = `${API}conversations `;

    constructor(private http: Http) {
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
            return new RequestOptions({headers: headers});
        }
    }

    getDataConversation() {
        return this.http.get(this.apiUrlConversation, this.jwt())
            .map(
                (res: any) => res.json()
            );
    }

    createConversation(id: number) {
        let options = this.jwt();
        let announcementId = {
            'announcementId': id
        };

        return this.http.post(this.apiUrlConversation, announcementId, options)
            .map((data: any) => {
                return data.json()
                },

                (err: any) => {

                    console.log(JSON.stringify(err._body));
                });

    }



}