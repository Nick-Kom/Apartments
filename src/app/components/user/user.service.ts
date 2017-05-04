import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { ISignUp } from "../sign-up/sign-up";

import { Phone } from "../../pages/portal/profile/phone";
import { Email } from "../../pages/portal/profile/email";
import { URL } from '../../api/url';

const API = `${URL()}api/v1/`;

@Injectable()
export class UserService {
    private apiUrlUser = `${API}users/`;
    private apiUrlPhones = `${this.apiUrlUser}telephones`;
    private apiUrlEmails = `${this.apiUrlUser}emails`;
    private apiUrlAvatar = `${API}users/image`;
    private subject = new Subject<any>();

    constructor(private http: Http) {}

    create(user: ISignUp) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(`${API}users`, user, options ).map((res: Response) =>  res);
    }

    authUser(): boolean {
        return !!localStorage.getItem('currentUser');
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
            return new RequestOptions({headers: headers});
        }
    }

    getDataAvatar() {
        return this.http.get(this.apiUrlAvatar, this.jwt())

    }

    getDataUsers() {
        return this.http.get(this.apiUrlUser, this.jwt())
            .map(
                (res: any) => res.json()
            );
    }

    getDataPhones() {
        return this.http.get(this.apiUrlPhones, this.jwt())
            .map((res: any) => res.json())
            .catch(this.handleError)
    }

    getDataEmails() {
        return this.http.get(this.apiUrlEmails, this.jwt())
            .map((res: any) => res.json())
            .catch(this.handleError)
    }

    updateDataUser(val: any) {
        this.subject.next(val);
        return this.http.put(this.apiUrlUser, val, this.jwt())
            .catch(this.handleError)
    }
    getNewName(): Observable<any> {
        return this.subject.asObservable();
    }

    createNewEmailForm(email: string): Observable<Email> {
        let options = this.jwt();
        let url = `${this.apiUrlEmails}/${email}`;
        let obj = {
            'email': email
        };

        return this.http.post(url, obj, options)
            .map((res: any) => res.json())
            .catch(this.handleError);
    }

    createNewPhoneForm(phone: string): Observable<Phone> {
        let options = this.jwt();
        let url = `${this.apiUrlPhones}/${phone}`;
        let obj = {
            'telephone': phone
        };

        return this.http.post(url, obj, options)
            .map((res: any) => res.json())
            .catch(this.handleError);
    }

    deleteUserPhone(telephone: Phone): Observable<Phone> {
        let url = `${this.apiUrlPhones}/${telephone.id}`;
        let options = this.jwt();

        return this.http.delete(url, options)
            .catch(this.handleError);
    };

    changeUserPhone(telephone: Phone): Observable<Phone> {
        let options = this.jwt();
        let obj = {
            id: telephone.id,
            telephone: telephone.telephone
        };

        return this.http.put(this.apiUrlPhones, obj, options)
            .catch(this.handleError);
    }

    deleteUserEmail(email: Email): Observable<Email> {
        let url = `${this.apiUrlEmails}/${email.id}`;

        return this.http.delete(url, this.jwt())
                    .catch(this.handleError);
    }

    changeUserEmail(email: Email): Observable<Phone> {
        let options = this.jwt();

        return this.http.put(this.apiUrlEmails, email, options)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Error occured', error);
        return Observable.throw(error.message || error);
    }


    private handleErrorAvatar() {
        return Observable.of(true);
    }
}