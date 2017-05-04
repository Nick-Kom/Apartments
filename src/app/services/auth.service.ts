import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {URL} from '../api/url';
import {AUTH_CONST} from './auth.constant';


const API = URL();

@Injectable()
export class AuthService {
    token: string;

    constructor(private http: Http,
                private router: Router) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string): Observable<boolean> {
        return this.http.post(
            API + 'oauth/token',
            `scope=global&grant_type=password&username=${email}&password=${password}`,
            this.returnHeader()
        ).map(
            (res: any) => {
                let body = JSON.parse(res._body);
                if (body) {
                    this.token = body.access_token;
                    localStorage.setItem('currentUser', JSON.stringify({email: email, token: body.access_token}));

                    return true;
                }

                return false;
            },
            (err:any) => {
                this.handleError(err);
                return err
            }
        );
    };

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    returnHeader() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic ' + btoa(AUTH_CONST['CLIENT_ID'] + ":" + AUTH_CONST.SECRET));
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('access-control-allow-origin', 'true');

        return new RequestOptions({headers: headers});
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