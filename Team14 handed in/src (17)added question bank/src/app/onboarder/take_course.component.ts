import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Course } from '../_models';
import { CourseService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'take_course.component.html',
    styleUrls: ['./ss_onboarder.component.css'] 
})

export class Take_CourseComponent implements OnInit {

  course: any[] = [];

  constructor(
      private courseService: CourseService,
      private alertService: AlertService,

      private router: Router
  ) {

  }

  ngOnInit() { 
      this.loadAll();
  }

  private loadAll() {
    this.courseService.getAllCourse()
    .pipe(first())
    .subscribe(
      course => {
        //this.faq = faq;
        this.course = course;
      },
      error => {
        this.alertService.error('Error, Data was unsuccesfully retrieved');
      } 
    );
  }

    newUser_RoleClicked = false;

  //Remove this bad boy
  testData() {
    this.course.push(
      { courseId: 1, courseDescription: 'jfsd', courseDueDate: '213', courseName: '3212'},
      { courseId: 2, courseDescription: 'fklsdm', courseDueDate: '21', courseName: 'as'},
      { courseId: 3, courseDescription: 'cxzkl', courseDueDate: '21', courseName: ''},
      { courseId: 4, courseDescription: '321', courseDueDate: '', courseName: ''},
    );
  }

}