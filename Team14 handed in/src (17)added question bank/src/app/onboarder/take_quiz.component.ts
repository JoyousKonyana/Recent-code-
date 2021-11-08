import { QuizService } from './../_services/quiz.service';


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertService, CourseService, Learning_OutcomeService, LessonService } from '../_services';
import { ModalService } from '../_modal';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManageCoursesService } from '../_services/manage-courses/manage-courses.service';
import { HttpEventType } from '@angular/common/http';
import { N_Quiz } from '../_services/manage-courses/manage-courses.types';

@Component({
  templateUrl: './take_quiz.component.html',
  styleUrls: ['./ss_onboarder.component.css']
})
export class Take_QuizComponent implements OnInit {
  //Store from Database
  quizzes: N_Quiz[] = [];
  question: any;

  lessonOutcomeId: any;

  constructor(
    private modalService: ModalService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,

    private alertService: AlertService,
    private _manageCoursesService: ManageCoursesService,
    private _ngxSpinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.lessonOutcomeId = params.get('id');
    });

    this.getLessonOutcomeQuizzesFromServer();
  }

  private getLessonOutcomeQuizzesFromServer() {
    this._manageCoursesService.getQuzzesByLessonOutcomeId(this.lessonOutcomeId).subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this.quizzes = event.body as N_Quiz[];
        this._ngxSpinner.hide();
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.alertService.error('Error: Course Enrollments not found');
      });
  }

  private getFormValidationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {

      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  private openSnackBar(message: string, action: string, _duration: number) {
    this._snackBar.open(message, action, {
      duration: _duration,
      verticalPosition: 'top'
    });
  }

}
