import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule}   from '@angular/router';
import {Sidebar} from "./sidebar.component";
import {AuthService} from "../../../services/auth.service";

import { FileUploadModule } from "../../file-upload/file-upload.module";
import { UserService } from "../../user/user.service";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        FileUploadModule
    ],
    declarations: [
        Sidebar
    ],
    providers: [
        AuthService,
        UserService
    ],
    exports: [
        Sidebar
    ]
})

export class SidebarModule {}