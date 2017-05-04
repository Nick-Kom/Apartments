import {Component, Optional} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user/user.service";

@Component({
    templateUrl: 'change-password.template.html',
    styleUrls: [
        'change-password.less'
    ]
})

export class ChangePasswordModal {
    changePasswordForm: FormGroup;
    success:boolean = false;

    constructor(
        @Optional() public dialogRef: MdDialogRef<ChangePasswordModal>,
        private userService: UserService,
        private fb: FormBuilder
    ) {}


    ngOnInit() {
        this.changePasswordForm = this.fb.group({
            old_password: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirm_password: ['', [Validators.required]]
        })
    }

    changePassword({value, valid}: {value: any, valid: boolean}): void {
        if(valid){
            console.log(value);
        }
    }
}