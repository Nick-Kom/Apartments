import {Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {FileUploadService} from "./file-upload.service";


@Component({
    selector: 'file-upload',
    templateUrl:'file-upload.template.html',
    styleUrls: ['file-upload.less']
})
export class FileUploadComponent {
    loader:boolean;
    messageAvatar:boolean;
    messageAvatarOk:boolean;
    subscription: Subscription;
    @Input() multiple: boolean = false;
    @ViewChild('fileInput') inputEl: ElementRef;

    constructor(private dataFileUploadService: FileUploadService) {
        this.subscription = this.dataFileUploadService.getMessageNotOk()
            .subscribe(message => {
                this.messageAvatar = message;
                this.loader=false;
            });
        this.subscription = this.dataFileUploadService.getMessageOk()
            .subscribe(message => {
                this.messageAvatarOk = message;
                this.loader=false;
            });
    }

    uploadAva(event: any){
        this.messageAvatar=false;
        this.messageAvatarOk = false;
        this.loader=true;

        let fileList: File[] = event.target.files;

            let file: File = fileList[0];
            this.dataFileUploadService.uploadAvatar(file)
    }

}