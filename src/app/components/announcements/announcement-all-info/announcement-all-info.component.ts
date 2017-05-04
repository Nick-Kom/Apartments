import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AnnouncementService} from '../announcements-list/announcement.service';
import {Announcement} from '../announcements-list/announcement';
import {UserService} from "../../user/user.service";
import {ScheduleService} from "../../schedule/schedule.service";
import {URL} from "../../../api/url";
import {ConversationService} from "../../message-box/message-box.service";

@Component({
    selector: 'announcement-all-info',
    templateUrl: 'announcement-all-info.template.html',
    styleUrls: ['../../../styles/forms.less', 'announcement-all-info.less']
})

export class AnnouncementAllInfo {
    announcement: Announcement;
    routeParams: Params = this.route.params;
    announcementId: number;
    images: any[] = [];
    requestForm: FormGroup;
    res: boolean = false;
    authorized: boolean;
    subscription: Subscription;
    conversationId: number;
    minDate: string = this.currentDate();

    private announcementSub: Subscription;

    constructor(private announcementsService: AnnouncementService,
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private scheduleService: ScheduleService,
                private conversationService: ConversationService,
                private userService: UserService) {
    }

    ngOnInit() {

console.log(this.conversationId)

        this.authorized = this.userService.authUser();

        this.routeParams.subscribe((params: Params) => this.announcementId = +params['id']);

        this.requestForm = this.fb.group({
            checkIn: ['', [Validators.required]],
            checkOut: ['', [Validators.required]]
        });

        this.announcementSub = this.announcementsService.getAnnouncementByIdSingle(this.announcementId)
            .subscribe((data: any) => {
                this.announcement = data;
            });

console.log(this.announcement )

        if (this.announcementId) {
            this.announcementsService.getImages(this.announcementId)
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

    }

    bookingRequest({value, valid}: { value: { checkIn: string, checkOut: string }, valid: boolean }) {
        if (valid) {
            let request = {
                ...value
            };

            this.scheduleService.createRequest(request, this.announcementId).subscribe(res => {
                this.res = true;
            });
        }
    }

    currentDate(): string {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();

        return mm+'-'+dd+'-'+yyyy;
    }

    ngOnDestroy() {
        this.announcementSub.unsubscribe();
    }

    startConversation() {
        this.conversationService.createConversation(this.announcementId).subscribe(
            (data: any) => {

                     this.router.navigate([`portal/messages/${data.id}`]);

            }
        )
    }

}
