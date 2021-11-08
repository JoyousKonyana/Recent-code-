import { ProgressReport } from './../_models/progressreport';
import { OnboarderService } from './../_services/onboarder.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService, AlertService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ 
    templateUrl: 'progress.component.html',
    styleUrls: ['./ss_onboarder.component.css'] 
})

export class ProgressComponent implements OnInit {
    progress: any = {};

    courseId: any;
    onboarderId: any;

    model: ProgressReport = {
      onboarderID: 1,
      courseID: 1
    }

    constructor(
      private onboarderService: OnboarderService,
      private _Activatedroute:ActivatedRoute,
      private _router:Router,
      private alertService: AlertService,
    ) {
    }

    token: any;
   
    onboarderid!:Number;
    ngOnInit() {

      this.token = localStorage.getItem('token');

      this._Activatedroute.paramMap.subscribe(params => { 
        this.courseId = params.get('id'); 
      });
      var movies = localStorage.getItem("user");
      movies     = JSON.parse(movies);
      this.onboarderid = movies['onboarderid'];
      console.log("onboadre number",this.onboarderid)

      this.onboarderService.generateCourseProgressReport(Number(this.onboarderid))
      .pipe(first())
      .subscribe(
        progress => {
          this.progress = progress;
          console.log(this.progress)
        },
        error => {
          this.alertService.error('Error, Data was unsuccesfully retrieved');
        } 
      );
    }

}