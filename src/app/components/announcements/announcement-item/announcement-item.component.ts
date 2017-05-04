import {Component, Input, EventEmitter, Output} from '@angular/core';
import {MdDialog} from '@angular/material';

import {AnnouncementService} from '../announcements-list/announcement.service';
import {Announcement} from '../announcements-list/announcement';
import {Address} from '../announcements-list/address';
import {Price} from '../announcements-list/price';
import {Image} from '../announcements-list/image';
import {AlertConfirmDeleting} from "../../modals/alert-confirm/alert-confirm-deleting";
import {URL} from "../../../api/url";

@Component({
    selector: 'announcement-item',
    templateUrl: 'announcement-item.template.html',
    styleUrls: ['announcement-item.less']
})

export class AnnouncementItem {
    @Output()
    deletedItemEmiter = new EventEmitter();

    images: any[] = [];
    address: Address;
    priceVal: Price;
    item: any;

    @Input() announcement: any;
    @Input() view:string = 'card';
    @Input() id:number;

    constructor(private dialog: MdDialog,
                private announcementsService: AnnouncementService) {
    }

    ngOnInit() {
        if (typeof this.id !== "undefined") {
            this.announcementsService.getImages(this.id)
                .subscribe((images: any) => {
                        this.images = images.json().map(
                            (item: any) => {
                                let url = item.imageUrl;
                                return {
                                    id: item.id,
                                    imageId: item.imageId,
                                    title: item.title,
                                    url: `${URL()}${url}`,
                                }
                            }
                        );
                    }
                );
        }

        if(this.announcement){
            this.item = this.announcement.announcementBean;
            this.address = this.announcement.addressBean;
            this.priceVal = this.announcement.priceBean;
        }
    }

    deleteAnnouncement(announcementId: number) {
        if (confirm) {
            this.announcementsService.deleteAnnouncementInfo(announcementId)
                .subscribe(
                    (res: any) => {
                        if (res.status === 200) {
                            this.deletedItemEmiter.emit(announcementId);
                        }
                    });
        }
    }

    hideFromSearch() {
        this.announcementsService.hideFromSearch( this.id ).subscribe(res => {
            if (res.status = 200) {
                this.announcement.hidden = !this.announcement.hidden
            }
        })
    }

    openDialog() {
        let dialogRef = this.dialog.open(AlertConfirmDeleting);
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res && res.delete) {
                this.deleteAnnouncement(this.id)
            }
        })
    }
}
