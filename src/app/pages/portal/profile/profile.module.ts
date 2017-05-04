import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { Profile } from "./profile.component";
import { FileUploadModule } from "../../../components/file-upload/file-upload.module";
import {UserService} from "../../../components/user/user.service";
import {UserInfoModule} from "../../../components/user/user-info/user-info.module";
import {ContactInfoModule} from "../../../components/user/contact-info/contact-info.module";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        UserInfoModule,
        ContactInfoModule,
        FileUploadModule
    ],
    declarations: [
        Profile
    ],
    providers: [
        UserService
    ],
    exports: [
        Profile
    ]
})

export class ProfilePageModule {}