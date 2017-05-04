import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Validators, FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {Message} from "./message";
import {MessageService} from "./conversation-dialog.service";
import {Observable} from 'rxjs/Observable';
import {Subscription} from "rxjs";
import {ConversationService} from "../message-box/message-box.service";
import {URL} from "../../api/url";


@Component({
    selector: 'conversation-dialog',
    templateUrl: 'conversation-dialog.template.html',
    styleUrls: [
        'conversation-dialog.less'
    ]
})

export class ConversationDialog implements OnInit {
    messageForm: FormGroup;
    routeParams: Params = this.route.params;
    announcementId: number;
    subscription: Subscription;
    conversationId: number;
    dialog: any[];
    url:string=URL();
    destroyForSetInterval:any;


    constructor(private fb: FormBuilder,
                private messageService: MessageService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.routeParams.subscribe((params: Params) => this.conversationId = +params['id']);
        console.log(this.conversationId);

        this.getMessagesSetTimeout()

        this.destroyForSetInterval = setInterval(()=>{
            this.getMessagesSetTimeout();
        }, 10000)

        this.messageForm = this.fb.group({
            message: ['']
        });

    }

    ngOnDestroy() {
      clearTimeout(this.destroyForSetInterval)
    }

    getMessagesSetTimeout(){
        this.messageService.getMessages(this.conversationId)
            .subscribe(data => {
                this.dialog = data;
                console.log(this.dialog);
            });

    }

    addMessage({value}: { value: any }) {
        this.messageService.createNewMessage(value.message, this.conversationId)
            .subscribe(
                (message: any) => {
                    this.messageForm.reset()
                    this.messageService.getMessages(this.conversationId)
                        .subscribe(data => {

                            this.dialog = data;
                            console.log(this.dialog);
                        });
                }
            );
    }


}
