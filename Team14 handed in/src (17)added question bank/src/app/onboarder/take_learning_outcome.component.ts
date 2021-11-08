import { Lesson_Content } from '../_models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router,ActivatedRoute } from '@angular/router';

import { Learning_Outcome } from '../_models';
import { AlertService, Learning_OutcomeService } from '../_services';

@Component({ 
    templateUrl: 'take_learning_outcome.component.html',
    styleUrls: ['./ss_onboarder.component.css'] 
})

export class Take_Learning_OutcomeComponent implements OnInit {

  lesson_outcome: any[] = [];

  id: any;

  constructor(
      private learning_outcomeService: Learning_OutcomeService,
      private alertService: AlertService,
      private _Activatedroute:ActivatedRoute,
      private _router:Router,
  ) {

  }

  ngOnInit() { 
      this._Activatedroute.paramMap.subscribe(params => { 
        this.id = params.get('id'); 
      });

      this.loadAll();
  }

  private loadAll() {
    this.learning_outcomeService.getLearning_OutcomeByLessonID(this.id)
    .pipe(first())
    .subscribe(
      lesson_outcome => {
        this.lesson_outcome = lesson_outcome;
      },
      error => {
        this.alertService.error('Error, Data was unsuccesfully retrieved');
      } 
    );
  }

  //Remove this bad boy
  testData() {
    this.lesson_outcome.push(
      { lessonOutcomeId: 1, lessonId: 1, lessonOutcomeDescription: 'This lesson outcome you will learn how to take to women',lessonOutcomeName: "12345"},
      { lessonOutcomeId: 2, lessonId: 1, lessonOutcomeDescription: 'This lesson outcome you will learn how to take to women',lessonOutcomeName: "12345"},
      { lessonOutcomeId: 3, lessonId: 1, lessonOutcomeDescription: 'This lesson outcome you will learn how to take to women',lessonOutcomeName: "12345"},
      { lessonOutcomeId: 4, lessonId: 1, lessonOutcomeDescription: 'This lesson outcome you will learn how to take to women',lessonOutcomeName: "12345"},
      { lessonOutcomeId: 5, lessonId: 1, lessonOutcomeDescription: 'This lesson outcome you will learn how to take to women',lessonOutcomeName: "12345"},
    );
  }

}