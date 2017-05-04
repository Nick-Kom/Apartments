import {Component, OnInit} from '@angular/core';
import {ConversationService} from "./message-box.service";


@Component({
    selector: 'message-box',
    templateUrl: 'message-box.template.html',
    styleUrls: [
        'message-box.less'
    ]
})

export class MessageBox implements OnInit {
    conversations: any[];
    loading: boolean;

    constructor(private conversationService: ConversationService) {
    }

    ngOnInit() {
        this.conversationService.getDataConversation()
            .subscribe(data => {
                this.conversations = data;
        });
    }

}
