import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {URL} from '../../api/url';
import {Observable} from "rxjs";

const API = `${URL()}api/v1/users/verify/`;

@Injectable()
export class EmailVerifyService {
    constructor(private http: Http) { }

    verifyEmail(token: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(API + token, options )
            .map((res: Response) =>  res)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let body = JSON.parse(error._body);
        let err = {
            ...body,
            status: error.status
        };

        return Observable.throw(err);
    }
}