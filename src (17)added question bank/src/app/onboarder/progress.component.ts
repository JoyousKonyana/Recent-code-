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

    ngOnInit() {

      this._Activatedroute.paramMap.subscribe(params => { 
        this.courseId = params.get('id'); 
      });

      this.model.courseID = this.courseId;
      this.model.onboarderID = 1;

      this.onboarderService.generateCourseProgressReport(this.model)
      .pipe(first())
      .subscribe(
        progress => {
          this.progress = progress;
        },
        error => {
          this.alertService.error('Error, Data was unsuccesfully retrieved');
        } 
      );
    }

}