import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { Learning_Outcome } from '../_models';
import { Learning_OutcomeService, AlertService } from '../_services';

@Component({
  templateUrl: 'learning_outcome.component.html',
  styleUrls: ['./ss_course.component.css']
})

export class Learning_OutcomeComponent implements OnInit {
  searchText: any;

  id: any;

  lesson_outcome_load: any[] = [];

  constructor(
    private learning_outcomeService: Learning_OutcomeService,
    private alertService: AlertService,

    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.loadAll();
  }

  loadAll() {
    this.learning_outcomeService.getLearning_OutcomeByLessonID(this.id)
      .pipe(first())
      .subscribe(
        lesson_outcome_load => {
          this.lesson_outcome_load = lesson_outcome_load;
        },
        error => {
          this.alertService.error('Error,Could not get lessons outcomes');
        }
      );
  }

  newLesson_OutcomeClicked = false;

  updateLearning_OutcomeClicked = false;

  model: any = {};
  model2: any = {};

  model3: Learning_Outcome = {
    LessonOutcomeId: 0,
    LessonId: 1,
    LessonOutcomeDescription: '',
    LessonOutcomeName: '',
  }

  testData() {
    this.lesson_outcome_load.push(
      {
        lessonOutcomeId: 1,
        lessonId: 15,
        lessonOutcomeDescription: '',
        lessonOutcomeName: '',
      }
    )
  }

  addLearning_Outcome() {
    if (Object.keys(this.model).length < 2) {
      this.alertService.error("Error, you have an empty feild");
      this.newLesson_OutcomeClicked = !this.newLesson_OutcomeClicked;
      this.model = {};
    }
    else if ((Object.keys(this.model).length == 2)) {
      this.model3.LessonId = this.id;
      this.model3.LessonOutcomeDescription = this.model.LessonOutcomeDescription;
      this.model3.LessonOutcomeName = this.model.LessonOutcomeName;

      this.learning_outcomeService.create(this.model3)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Creation was successful', true);
            // this.lesson_outcome_load.push(this.model);
            this.loadAll();
            this.newLesson_OutcomeClicked = !this.newLesson_OutcomeClicked;
            this.model = {};
          },
          error => {
            this.alertService.error('Error, Creation was unsuccesful');
          });
    }
  }


  deleteLearning_Outcome(i: number) {
    this.learning_outcomeService.delete(i)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Deletion was successful', true);
          this.loadAll();
        },
        error => {
          this.alertService.error('Error, Deletion was unsuccesful');
        });
  }

  myValue = 0;

  editLearning_Outcome(editLearning_OutcomeInfo: number) {
    this.updateLearning_OutcomeClicked = !this.updateLearning_OutcomeClicked;

    this.model2.LessonOutcomeName = this.lesson_outcome_load[editLearning_OutcomeInfo].lessonOutcomeName;
    this.model2.LessonOutcomeDescription = this.lesson_outcome_load[editLearning_OutcomeInfo].lessonOutcomeDescription;

    this.myValue = editLearning_OutcomeInfo;
  }

  updateLearning_Outcome() {
    let editLearning_OutcomeInfo = this.myValue;

    this.model3.LessonOutcomeId = this.lesson_outcome_load[editLearning_OutcomeInfo].lessonOutcomeId;
    this.model3.LessonId = this.id;
    this.model3.LessonOutcomeDescription = this.model2.LessonOutcomeDescription;
    this.model3.LessonOutcomeName = this.model2.LessonOutcomeName;

    for (let i = 0; i < this.lesson_outcome_load.length; i++) {

      if (i == editLearning_OutcomeInfo) {
        this.learning_outcomeService.update(this.model3.LessonOutcomeId, this.model3)
          .pipe(first())
          .subscribe(
            data => {
              this.alertService.success('Update was successful', true);
              this.loadAll();
              this.model2 = {};
            },
            error => {
              this.alertService.error('Error, Update was unsuccesful');
            });
      }
    }
  }

  addNewLearning_OutcomeBtn() {
    this.newLesson_OutcomeClicked = !this.newLesson_OutcomeClicked;
  }

  closeUpdate() {
    this.updateLearning_OutcomeClicked = !this.updateLearning_OutcomeClicked;
  }

}
