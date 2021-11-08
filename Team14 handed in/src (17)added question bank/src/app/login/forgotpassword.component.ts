import { Login } from './../_models/login';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { ForgotPassWord } from '../_models';

@Component({ 
    templateUrl: 'forgotpassword.component.html',
    styleUrls: ['./login.component.css']
})

export class ForgotPasswordComponent implements OnInit {
    loading = false;
    submitted = false;
    error = 'You have entered the incorrect Username or Password. Try again!';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
    }

    ngOnInit() {
        this.loginForm
    }

    loginForm = this.formBuilder.group({
        username: ['', Validators.required],
    });

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    forgotPassword!:ForgotPassWord;
    secretLogin(){
        this.router.navigateByUrl('/otp');
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.forgotPassword=this.loginForm.get('username')?.value;
        alert(this.forgotPassword=this.loginForm.get('username')?.value);
        this.authenticationService.forgotpassword(this.forgotPassword)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('/otp');
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}
