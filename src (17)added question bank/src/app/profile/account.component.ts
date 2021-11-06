

import { AlertService } from './../_services/alert.service';
import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, ResetPassword } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({ 
    templateUrl: 'account.component.html',
    styleUrls: ['./profile.component.css']
})

export class AccountComponent {
    loading = false;

    user: any[] = [];

    model: any = {};

    model2: ResetPassword = {
        UserId!: 0,
        Password: ''
    };

    constructor(
        private userService: UserService,
        private alertService: AlertService,
    ) {
    }

    ngOnInit() {
    }

    reset(){
        if(this.model.New == this.model.Confirm)
                     {

                         this.model2.UserId = localStorage.getItem('user');
                         this.model2.Password = this.model.Confirm;
                         alert(this.model2.Password)

                        this.userService.resetPassword(this.model2)
                        .pipe(first())
                        .subscribe(
                            data => {
                                this.alertService.success('Password has been Changed', true);
                            },
                            error => {
                                this.alertService.error('Error, Password was not changed');
                            });
                     }

    }

}