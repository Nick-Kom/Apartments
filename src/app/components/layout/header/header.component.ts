import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user/user.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {URL} from "../../../api/url";

@Component({
    selector: 'main-header',
    templateUrl: 'header.template.html',
    styleUrls: ['header.less']
})

export class Header implements OnInit {
    authorized: boolean;
    avatar: string;

    constructor(
        private userService: UserService,
        private router: Router,
        private auth: AuthService
    ) {}

    ngOnInit() {
        this.userService
            .getDataAvatar()
            .subscribe((avatar:any) => {
                    this.avatar = URL()+ avatar.text() ;
                }
            );

        this.authorized = this.userService.authUser()
    }

    doLogout() {
        this.auth.logout();
        this.router.navigate(['/sign-in']);
    }
}
