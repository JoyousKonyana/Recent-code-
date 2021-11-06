import { OnboarderService } from './../_services/onboarder.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Course } from '../_models';
import { CourseService, AlertService } from '../_services';

import { Router } from '@angular/router';

@Component({ 
    templateUrl: 'onboarder.component.html',
    styleUrls: ['./ss_administrator.component.css'] 
})

export class OnboarderComponent implements OnInit {
  onboarder: any[] = [];

  searchText = '';

  constructor(
      private onboarderService: OnboarderService,
      private alertService: AlertService,

      private router: Router
  ) {

  }

  ngOnInit() { 
      this.loadAll();
  }

  private loadAll() {
    this.onboarderService.getAllOnboarder()
    .pipe(first())
    .subscribe(
      onboarder => {
        this.onboarder = onboarder;
      },
      error => {
        this.alertService.error('Error, Data (Onboarder) was unsuccesfully retrieved. You can view Onboarder alternatively on Employee Center page.');
      } 
    );
  }

    newCourseClicked = false;
    
  deleteOnboarder(i: number) {
    this.onboarderService.delete(i)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Deletion was successful', true);
                    this.loadAll();
                },
                error => {
                    this.alertService.error('Error, Deletion was unsuccesful. Perhaps this Onboarder is assigned to Course or Equipment, you muct unassign before deleting.');
                });
  }

    addNewCourseBtn() {
        this.newCourseClicked = !this.newCourseClicked;
      }   

}