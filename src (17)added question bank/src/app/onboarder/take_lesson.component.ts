import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Lesson } from '../_models';
import { LessonService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'take_lesson.component.html',
    styleUrls: ['./ss_onboarder.component.css'] 
})

export class Take_LessonComponent implements OnInit {

  lesson: any[] = [];

  id: any;

  constructor(
      private lessonService: LessonService,
      private alertService: AlertService,

      private _Activatedroute:ActivatedRoute,
      private router: Router,
  ) {

  }

  ngOnInit() { 
      this._Activatedroute.paramMap.subscribe(params => { 
        this.id = params.get('id'); 
      });

      this.loadAll();
  }

  loadAll() {
    this.lessonService.getLessonByCourseId(this.id)
    .pipe(first())
    .subscribe(
      lesson => {
        this.lesson = lesson;
      },
      error => {
        this.alertService.error('Error, Data was unsuccesfully retrieved');
      } 
    );
  }

    //newUser_RoleClicked = false;

  //Remove this bad boy
  testData() {
    this.lesson.push(
      { lessonId: 1, courseId: 1, lessonCompletionStatusId: 1, lessonDescription: '213', lessonName: '3212'},
      { lessonId: 2, courseId: 1, lessonCompletionStatusId: 1, lessonDescription: '21', lessonName: 'as'},
      { lessonId: 3, courseId: 2, lessonCompletionStatusId: 1, lessonDescription: '21', lessonName: ''},
      { lessonId: 4, courseId: 2, lessonCompletionStatusId: 1, lessonDescription: '', lessonName: ''},
    );
  }

}