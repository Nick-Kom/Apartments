import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {Subscription} from 'rxjs/Subscription';

import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../user/user.service";
import {URL} from "../../../api/url";

import {User} from "../../../pages/portal/profile/user";
import {FileUploadService} from "../../file-upload/file-upload.service";


@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.template.html',
    styleUrls: ['sidebar.less']
})

export class Sidebar {
    avatar: string;
    user: User;
    subscription: Subscription;

    constructor(private router: Router,
                private auth: AuthService,
                private dataSidebarService: UserService,
                private dataFileUploadService: FileUploadService) {}

    ngOnInit() {
        this.dataSidebarService
            .getDataAvatar()
            .subscribe((avatar: any) => {
                    this.avatar = URL() + avatar.text();
                }
            );

        this.subscription = this.dataFileUploadService.getAvatar()
            .subscribe(message => {
                this.avatar = message;
            });


        this.dataSidebarService.getDataUsers()
            .subscribe((user: User) => {
                this.user = user;
            });


        this.subscription = this.dataSidebarService.getNewName()
            .subscribe(message => {
                this.user = message;
            });
    }

    showUserName(): string {
        const USER: User = this.user;

        if (USER) {
            let firstName = USER.firstName;
            let lastName = USER.lastName;
            let email = USER.email;

            if (firstName && lastName) {
                return `${firstName} ${lastName}`;
            }

            return email.slice(0, email.indexOf('@'));
        }
    }

    doLogout() {
        this.auth.logout();
        this.router.navigate(['/sign-in']);
    }
}
