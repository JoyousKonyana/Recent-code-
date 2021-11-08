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
import { submitquizDTO } from '../_models';
import { InputModalityDetector } from '@angular/cdk/a11y';

@Component({
  templateUrl: './quiz.component.html',
  styleUrls: ['./ss_onboarder.component.css']
})
export class QuizComponent implements OnInit {
  //Store from Database
  quiz: any;
  quizId: any;

  // storedAnswers: submitquizDTO[];
  storedAnswers:any;
  storedAnswer: string;

  selectedOptions:any[] = [];
  slectedOption:any = {};

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
onboarderid!:number;
courseid!:number;
  ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.quizId = params.get('id');

      var movies = localStorage.getItem("user");
      movies     = JSON.parse(movies);
      this.onboarderid = movies['onboarderid'];

      this.courseid = Number(localStorage.getItem("courseid"));
      console.log(movies['id']);
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
        console.log("quiz",this.quiz);
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

  selected(event:any, question:any) {

   
    this.slectedOption["OptionId"] = event.id;
    this.slectedOption["QuestionId"] = question.id;

    this.selectedOptions.push(this.slectedOption);

  }

  submitQuiz() {
<<<<<<< HEAD
    var formToSubmit ={};
    formToSubmit["QuizId"] = this.quizId;
    formToSubmit["QuestionsAndOptions"] = this.selectedOptions;
   console.log(formToSubmit)
  //   this.quizService.submitQuiz(this.courseid,this.onboarderid,this.quizId, this.storedAnswers)
  //       .pipe(first())
  //       .subscribe(
  //         data => {
  //           this.alertService.success('Creation was successful', true);
  //         },
  //         error => {
  //           this.alertService.error('Error, Creation was unsuccesful');
  //         });
=======
    this.quizService.submitQuiz(1,this.token.onboarderId,this.quizId, this.storedAnswers)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Quiz submitted', true);
            this.router.navigate(['/take_course'])
          },
          error => {
            this.alertService.error('Error, Quiz not submitted');
          });
>>>>>>> e98385da28eb86894a3fe462852745a49bedf532
  }

}
;