import {Component} from '@angular/core';
import {AnnouncementService} from './announcement.service';
import {Announcement} from './announcement';
import {Subscription} from "rxjs";

@Component({
    selector: 'announcement-list',
    templateUrl: 'announcement-list.template.html',
    styleUrls: ['announcement-list.less']
})

export class AnnouncementList {
    announcements: Announcement[];
    loading: boolean;
    private announcementSub: Subscription;

    constructor(
        private dataAnnouncementsService: AnnouncementService
    ) {}

    ngOnInit() {
        this.loading = true;
        this.announcementSub = this.dataAnnouncementsService.getUserAnnouncements().subscribe(data => {
            this.loading = false;
            this.announcements = data;
        });
    }

    deleteItem(id: number) {
        this.announcements = this.announcements.filter((item: any) => item.idAnnouncement !== +id );
    }

    ngOnDestroy() {
        this.announcementSub.unsubscribe();
    }

}
