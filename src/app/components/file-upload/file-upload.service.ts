import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of'

import {URL} from '../../api/url';

const API = `${URL()}api/v1/`;

@Injectable()
export class FileUploadService {
    private apiUrlImages = `${API}images`;
    private apiUrlAva = `${API}users/image`;
    private apiUrlAnnoucement = `${API}announcements`;

    constructor(private http: Http) {
    }

    private subject = new Subject<any>();
    private subjectMessage = new Subject<any>();
    private subjectMessageOk = new Subject<any>();
    private subjectImageSrc = new Subject<any>();

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
            return new RequestOptions({headers: headers});
        }
    }

    uploadAvatar(file: any) {
        let input = new FormData();
        input.append('file', file, file.name);
        this.http
            .post(this.apiUrlImages, input, this.jwt())
            .subscribe(
                (data: any) => {
                    if (data.status == 200) {
                        this.subjectMessageOk.next(true)
                        this.subjectMessage.next(false)
                    }
                    console.log(data);
                    this.http
                        .put(this.apiUrlAva, JSON.parse(data._body)[0], this.jwt())
                        .subscribe((data: any) => {
                            this.http
                                .get(this.apiUrlAva, this.jwt())
                                    .subscribe((avatar: any) => {
                                        console.log(avatar)
                                        this.subject.next(URL() + avatar._body);
                                });
                        },(err: any) => {
                            if (err.status == 400) {
                                console.log(JSON.stringify(err._body));
                                this.subjectMessage.next(true)
                                this.subjectMessageOk.next(false)
                            }
                        });
                }
            );
    }

    uploadImages(inputEl: any): Observable<any> {
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) {
            for (let i = 0; i < fileCount; i++) {
                formData.append('file', inputEl.files.item(i));
            }
            return this.http.post(this.apiUrlImages, formData, this.jwt())
                .map((data: any) => {
                        if (data.status == 200) {
                            this.subjectMessage.next(false)
                            this.subjectImageSrc.next(data.json())
                            console.log(data.json())
                        }
                    },
                    (err: any) => {
                        if (err.status == 400) {
                            console.log(JSON.stringify(err._body));
                            this.subjectMessage.next(true)
                            this.subjectMessageOk.next(false)
                        }
                    }
                );
        }
    }


    getAvatar(): Observable<any> {
        return this.subject.asObservable();
    }

    getMessageNotOk(): Observable<any> {
        return this.subjectMessage.asObservable();
    }

    getMessageOk(): Observable<any> {
        return this.subjectMessageOk.asObservable();
    }

    getImageSrc(): Observable<any> {
        return this.subjectImageSrc.asObservable();
    }
}