import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";

import {UserInfo} from "./user-info.component";
import {UserService} from "../user.service";
import {FileUploadModule} from "../../file-upload/file-upload.module";
import {FileUploadService} from "../../file-upload/file-upload.service";
import {ChangeAvatarModal} from "../../modals/change-avatar/change-avatar";
import {ChangePasswordModal} from "../../modals/change-password/change-password";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        FileUploadModule,
        MaterialModule
    ],
    declarations: [
        UserInfo,
        ChangeAvatarModal,
        ChangePasswordModal
    ],
    entryComponents: [
        ChangeAvatarModal,
        ChangePasswordModal
    ],
    providers: [
        UserService,
        FileUploadService
    ],
    exports: [
        UserInfo
    ]
})

export class UserInfoModule {}