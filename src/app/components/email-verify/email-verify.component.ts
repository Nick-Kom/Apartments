import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {EmailVerifyService} from "./email-verify.service";

@Component({
    selector: 'email-verify',
    template: `
       <div>
           <h2>Verifying your email..</h2>
           <p>Please wait few seconds.</p>
       </div>
   `,
    styleUrls: []
})

export class EmailVerify implements OnInit {
    token: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private emailVerifyService: EmailVerifyService
    ) {}

    ngOnInit() {
        this.route
            .queryParams
            .subscribe((params:any) => {
                if (typeof params.token !== 'undefined') {
                    this.emailVerifyService.verifyEmail(params.token).subscribe((res) => {
                            console.log(res);
                            this.router.navigate(['/sign-in']);
                        },
                        (err: any)=> {
                            console.log(err);
                        }
                    );
                }
            });
    }
}