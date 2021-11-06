import { OTP } from './../_models/otp';
import { Login } from './../_models/login';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Component({ templateUrl: 'otp.component.html',
styleUrls: ['./login.component.css'] })

export class OTPComponent implements OnInit {
    //loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    session = '1';

    subscription: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    OTPInfo:OTP = {
        UserId: 5,
        OtpValue:''
    };

    model: any;

    ngOnInit() {
        this.otpForm;

        this.model = localStorage.getItem('user');
    }

    otpForm = this.formBuilder.group({
        otp: ['', Validators.required],
    });

    // convenience getter for easy access to form fields
    get f() { return this.otpForm.controls; }

    secretLogin(){
        this.router.navigate(['/']);
        localStorage.setItem('SeesionUser',this.session);
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.otpForm.invalid) {
            return;
        }

        this.loading = true;
        this.OTPInfo.UserId = this.model;
        this.OTPInfo.OtpValue = this.otpForm.get('otp')?.value;

       //this.authenticationService.loggedIn();

        this.authenticationService.otp(this.OTPInfo)
            .pipe(first())
            .subscribe({
                next: () => {
                    console.log("In Next")
                    localStorage.setItem('SeesionUser',this.session);
                    this.router.navigate(['/']);
                },
                error: error => {
                  console.log(error)
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}
