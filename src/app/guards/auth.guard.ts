import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {UserService} from "../components/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            return true;

        }

        this.router.navigate(['/public/sign-in']);
        return false;
    }
}