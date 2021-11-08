import { submitQuiz } from './../_models/submitQuiz';
import { QuizService } from './../_services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services';
import { ModalService } from '../_modal';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManageCoursesService } from '../_services/manage-courses/manage-courses.service';
import { N_Quiz } from '../_services/manage-courses/manage-courses.types';

@Component({
  templateUrl: './quiz.component.html',
  styleUrls: ['./ss_onboarder.component.css']
})
export class QuizComponent implements OnInit {
  //Store from Database
  quiz: any;
  quizId: any;

  storedAnswers: any;
  storedAnswer: string;

  constructor(
    private modalService: ModalService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,

    private quizService: QuizService,

    private alertService: AlertService,
    private _manageCoursesService: ManageCoursesService,
    private _ngxSpinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
  }

  token: any;

  ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.quizId = params.get('id');
    });

    this.token = localStorage.getItem('token');    

    this.getLessonOutcomeQuizzesFromServer();
  }

  private getLessonOutcomeQuizzesFromServer() {
    this._manageCoursesService.getQuizDetails(this.quizId).subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this.quiz = event.body as any;
        console.log(this.quiz);
        this._ngxSpinner.hide();
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.alertService.error('Error: Course Enrollments not found');
      });
  }

  model: submitQuiz = {
    QuestionId: 0,
    OptionId: ''
  }

  selected(index: number) {
    this.model.QuestionId = index;
    this.model.OptionId = this.storedAnswer;

    this.storedAnswers.push(this.model)
  }

  submitQuiz() {
    this.quizService.submitQuiz(1,this.token.onboarderId,this.quizId, this.storedAnswers)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Creation was successful', true);
          },
          error => {
            this.alertService.error('Error, Creation was unsuccesful');
          });
  }

}
