import {Injectable, OnInit} from '@angular/core';
import {Announcement} from "./announcement";
import {URL} from '../../../api/url';
import {Image} from "./image";
import {Address} from "./address";
import {Price} from "./price";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable, Subscription} from "rxjs";

const API = `${URL()}api/v1/`;
const API_ANNOUNCEMENT = `${API}users/announcements`;
const API_FILTER_ANNOUNCEMENT = `${API}filters`;
const API_FACILITY = `${API}facilities/`;


@Injectable()
export class AnnouncementService {
    constructor(private http: Http) {
    }

    getUserAnnouncements() {
        return this.http.get(API_ANNOUNCEMENT, this.jwt()).map((res: any) => res.json());
    }

    getAnnouncementByIdSingle(announcementId: number){
      return  this.http.get(`${API_ANNOUNCEMENT}/${announcementId}`).map((res: any) => {
          let body = res.json()
          console.log(body.facilitiesBean);
          return {
              description: body.announcementBean,
              address: body.addressBean,
              price: body.priceBean,
              facilities: body.facilityBeans
          }
      })
    }

    getAnnouncementById(announcementId: number) {
        let obs_ary: any = [
            this.http.get(`${API_ANNOUNCEMENT}/${announcementId}`, this.jwt()),
            this.getAddress(announcementId),
            this.getPrice(announcementId),
            this.getFacilities(announcementId)
        ];

        return Observable.forkJoin(obs_ary).map((res: any) => {
            return {
                description: JSON.parse(res[0]._body),
                address: JSON.parse(res[1]._body),
                price: JSON.parse(res[2]._body),
                facilities: JSON.parse(res[3]._body)
            }
        })
    }

    getImages(id: number): Observable<Image> {
        return this.http.get(`${API}announcements/${id}/images`, this.jwt())
            .map((res: any) => res);

    }

    getAddress(id: number): Observable<Object> {
        return this.http.get(`${API_ANNOUNCEMENT}/${id}/address`, this.jwt()).map((res: any) => res);
    }

    getPrice(id: number): Observable<Price> {
        return this.http.get(`${API_ANNOUNCEMENT}/${id}/prices`, this.jwt()).map((res: any) => res);
    }

    getFacilities(id: number) {
        return this.http.get(`${API_ANNOUNCEMENT}/${id}/facilities`, this.jwt())
            .map((res: any) => {
                return res;
            });
    }

    getOptions() {
        return this.http.get(API_FACILITY, this.jwt()).map((res: any) => res);
    }

    deleteAnnouncementInfo(announcementId: number): Observable<Object> {
        return this.http.delete(`${API_ANNOUNCEMENT}/${announcementId}`, this.jwt())
            .map(res => res)
    }

    createAnnouncement(obj: any, arrImages: any = []) {
        let description = {
            ...obj.description,
            hidden: false
        };

        return this.http.post(
            `${API_ANNOUNCEMENT}`,
            description,
            this.jwt()).map((res: any) => {
                let announcementId = res.json().id;

                let formatedArr = arrImages.map(
                    (item: any) => {
                        let imageId = item.id;
                        let title = item.url;
                        return {
                            imageId,
                            title
                        }
                    }
                );
                let url = `${API}announcements/${announcementId}/images`;
                this.http.post(url, formatedArr, this.jwt())
                    .subscribe((data: any) => {
                            return data;
                        }
                    );

                let obs_ary: any = [
                    this.saveAddress(obj.address, JSON.parse(res._body).id),
                    this.savePrice(obj.priceBlock, JSON.parse(res._body).id),
                    this.saveFacilities(obj.description.options, JSON.parse(res._body).id)
                ];
                return Observable.forkJoin(obs_ary).subscribe(res => console.log(res));
            }
        );
    }

    saveAddress(address: Address, announcementId: number) {
        return this.http.post(`${API_ANNOUNCEMENT}/${announcementId}/address`, address, this.jwt())
            .map((res: any) => {
                return res;
            });
    }

    savePrice(price: Price, announcementId: number) {
        return this.http.post(`${API_ANNOUNCEMENT}/${announcementId}/prices`, price, this.jwt())
            .map((res: any) => {
                return res;
            });
    }

    hideFromSearch(id: number) {
        return this.http.put(`${API}users/announcements/hidden/${id}`, {}, this.jwt())
            .map((res: any) => {
                return res;
            });
    }

    updateAnnouncement(obj: any, announcementId: number, arrImages: any[] = []): any {
        let description = obj.description;
        let facilities = {...description.options};

        delete description.options;
        description.id = announcementId;

        let formatedArr = arrImages.map(
            (item: any) => {
                let imageId = item.id;
                let title = item.url;
                return {
                    imageId,
                    title
                }
            }
        );

        let url = `${API}announcements/${announcementId}/images`;
        this.http.post(url, formatedArr, this.jwt())
            .subscribe((data: any) => {
                    return data;
                }
            );

        return this.http.put(`${API}users/announcements`, description, this.jwt())
            .map((res: any) => {

                this.updatePrice(obj.priceBlock, announcementId).subscribe();
                this.updateAddress(obj.address, announcementId).subscribe();
                this.saveFacilities(facilities, announcementId).subscribe();
            });
    }

    updatePrice(obj: any, announcementId: number) {
        return this.http.put(`${API_ANNOUNCEMENT}/${announcementId}/prices`, obj, this.jwt())
            .map((res: any) => {
                return res;
            });
    }

    updateAddress(obj: any, announcementId: number) {
        return this.http.put(`${API_ANNOUNCEMENT}/${announcementId}/address`, obj, this.jwt())
            .map((res: any) => {
                return res;
            });
    }

    saveFacilities(options: any, announcementId: number) {
        let optionsVar = options;
        let optionArray: any[] = [];

        Object.keys(optionsVar).forEach(function (key) {
            if (!optionsVar[key]) {
                delete optionsVar[key];
            }
            else {
                optionArray.push({"id": +key})
            }
        });

        return this.http.post(`${API_ANNOUNCEMENT}/${announcementId}/facilities`, optionArray, this.jwt())
            .map((res: any) => {
                return res;
            });
    }

    deleteImageAnnouncement(image: any, announcementId: number) {
        let url = `${API}announcements/${announcementId}/images/${image.id}`;
        let options = this.jwt();

        return this.http.delete(url, options)
            .map((res: any) => {
                return res;
            });
    }

    deleteImageNew(image: any) {
        let url = `${API}images/${image.id}`;
        let options = this.jwt();
        return this.http.delete(url, options)
            .map((res: any) => {
                return res;
            });
    }

    announcementsFilter(query: any = {}, pagin: any) {
        // let queryString = Object.keys(query).map((key) => key + '=' + query[key]).join('&');
console.log(query);

        return this.http.get(API_FILTER_ANNOUNCEMENT+'?'+'limit='+query+"&offset="+pagin).map((res: any) => res.json());
        // return this.http.get(API_FILTER_ANNOUNCEMENT + '?' + queryString).map((res: any) => res.json());
    }


    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
            return new RequestOptions({headers: headers});
        }
    }

}