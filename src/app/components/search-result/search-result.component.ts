import {Component, OnInit} from '@angular/core';
import {AnnouncementService} from "../announcements/announcements-list/announcement.service";
import {Router, Params, ActivatedRoute} from "@angular/router";
import {subscribeOn} from "rxjs/operator/subscribeOn";

@Component({
    selector: 'search-result',
    templateUrl: 'search-result.template.html',
    styleUrls: [
        '../../styles/forms.less',
        'search-result.less'
    ]
})

export class SearchResult implements OnInit {
    result: any;
    announcements: any[] = [];
    searchLabel: boolean = false;
    queryParams: any;
    limit: number = 6;
    offset: number = 0;
    hideButton: boolean = false;

    constructor(private announcementService: AnnouncementService,
                private route: ActivatedRoute,
                private router: Router) {
        this.scrollCallback = this.loadMore.bind(this);
    }

    ngOnInit() {
        // this.route.queryParams.subscribe((params: Params) => {
        //     this.queryParams = params;
        //     this.searchLabel = Object.keys(params).length > 0;
        //     this.getAnnouncements(params);
        // });
        this.loadMore()
    }

    scrollCallback: any;


    loadMore() {
        return this.announcementService.announcementsFilter(this.limit, this.offset).subscribe(res => {
            this.processData(res)
        })
    }


    private processData(news: any) {
        this.limit += 6;
        this.offset += 6;

        this.announcements = this.announcements.concat(news);

    }


}
