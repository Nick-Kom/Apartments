import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs";

import {UserService} from "../user.service";
import {URL} from '../../../api/url';
import {User} from "../../../pages/portal/profile/user";
import {FileUploadService} from "../../file-upload/file-upload.service";
import {MdDialog} from "@angular/material";
import {ChangeAvatarModal} from "../../modals/change-avatar/change-avatar";
import {ChangePasswordModal} from "../../modals/change-password/change-password";

@Component({
    selector: 'user-info',
    templateUrl: 'user-info.template.html',
    styleUrls: [
        '../../../styles/forms.less',
        '../../../styles/portal-section-header.less',
        'user-info.less'
    ]
})

export class UserInfo implements OnInit {
    userInfo: FormGroup;
    user: User;
    infoEdit: boolean = false;
    errorMessage: string;
    avatar: string;
    subscription: Subscription;

    constructor(private fb: FormBuilder,
                private dialog: MdDialog,
                private userService: UserService,
                private dataFileUploadService: FileUploadService) {
    }

    ngOnInit() {
        this.userService.getDataUsers()
            .subscribe((user: User) => {
                this.user = user;
                this.userInfo = this.fb.group({
                    firstName: [this.user.firstName || '', [Validators.required, Validators.minLength(2)]],
                    lastName: [this.user.lastName || '', [Validators.required, Validators.minLength(2)]]
                });
            });

        this.userService
            .getDataAvatar()
            .subscribe((avatar: any) => {
                    this.avatar = URL() + avatar.text();
                }
            );

        this.subscription = this.dataFileUploadService.getAvatar()
            .subscribe(message => {
                this.avatar = message;
            });
    }

    onSubmit({value}: {value: any}) {
        this.userService.updateDataUser(value)
            .subscribe(
                res => {
                    this.user.firstName = value.firstName;
                    this.user.lastName = value.lastName;
                    this.changeView();
                }
            );
    }

    changeView() {
        this.infoEdit = !this.infoEdit;
    }

    openDialog() {
        this.dialog.open(ChangeAvatarModal);
    }

    changePasswordDialog(){
        this.dialog.open(ChangePasswordModal);
    }
}
