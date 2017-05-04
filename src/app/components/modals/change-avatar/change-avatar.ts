import {Component, Optional} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {Subscription} from "rxjs";
import {URL} from '../../../api/url'
import {FileUploadService} from "../../file-upload/file-upload.service";
import {UserService} from "../../user/user.service";

@Component({
    templateUrl: 'change-avatar.template.html',
    styleUrls: [
        'change-avatar.less'
    ]
})

export class ChangeAvatarModal {
    avatar: string;
    subscription: Subscription;

    constructor(
        @Optional() public dialogRef: MdDialogRef<ChangeAvatarModal>,
        private userService: UserService,
        private dataFileUploadService: FileUploadService
    ) {}


    ngOnInit() {
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
}