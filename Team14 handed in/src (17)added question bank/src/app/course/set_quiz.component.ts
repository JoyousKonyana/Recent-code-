import { Quiz } from './../_models/quiz';
import { QuizService } from './../_services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { ManageCoursesService } from '../_services/manage-courses/manage-courses.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpEventType } from '@angular/common/http';
import { N_questionBank, N_questionBankWithQuestions, N_Quiz } from '../_services/manage-courses/manage-courses.types';
import { ThrowStmt } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: 'set_quiz.component.html',
  styleUrls: ['./ss_course.component.css']
})

export class Set_QuizComponent implements OnInit {
  minDate: Date;
  myValue = 0;
  newQuizClicked = false;
  updateQuizClicked = false;

  model: Quiz = {
    QuizId: 0,
    LessonOutcomeId: 0,
    QuizDescription: '',
    QuizMarkRequirement: '',
    QuizDueDate: '',
    QuizCompletionDate: '',
    NumberOfQuestions: 5
  }

  lesssonOutcomeId: any;
  quizzes: N_Quiz[] = [];
  addQuizForm: FormGroup;

  questionBanks: N_questionBankWithQuestions[] = [];
  bankQuestionLength = 0;

  constructor(
    private alertService: AlertService,
    private _activatedRoute: ActivatedRoute,
    private _manageCoursesService: ManageCoursesService,
    private _ngxSpinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _formBuilder: FormBuilder,
  ) {
    this._activatedRoute.paramMap.subscribe(params => {
      this.lesssonOutcomeId = params.get('id');
    });
  }

  ngOnInit() {
    this.getOutcomeQuizzesFromServer();
    this.getQuestionBanksWithQuestionsByOutcomeFromServer();
    this.minDate = new Date()
  }





  editQuiz(editQuizInfo: number) {
    // this.updateQuizClicked = !this.updateQuizClicked;

    // this.model.QuizDescription = this.quiz[editQuizInfo].lessonDescription;
    // this.model.QuizMarkRequirement = this.quiz[editQuizInfo].lessonName;
    // this.model.QuizDueDate = this.quiz[editQuizInfo].quizDueDate;
    // this.model.NumberOfQuestions = this.quiz[editQuizInfo].numberOfQuestions;

    // this.myValue = editQuizInfo;
  }

  updateQuiz() {
    // let editQuizInfo = this.myValue;

    // this.model.LessonOutcomeId = this.id;

    // for (let i = 0; i < this.quiz.length; i++) {
    //   if (i == editQuizInfo) {
    //     this.quizSerivce.updateQuiz(this.quiz[editQuizInfo].quizId, this.model)
    //       .pipe(first())
    //       .subscribe(data => {
    //         this.alertService.success('Quiz was Successfully Updated');
    //         this.loadAll();
    //       }, error => {
    //         this.alertService.success('Unsuccessful Update');
    //         this.loadAll();
    //       });
    //   }
    // }
  }

  addNewQuizBtn() {
    this.newQuizClicked = !this.newQuizClicked;
  }

  closeUpdate() {
    this.updateQuizClicked = !this.updateQuizClicked;
  }


  private getOutcomeQuizzesFromServer() {
    this._manageCoursesService.getQuzzesByLessonOutcomeId(this.lesssonOutcomeId).subscribe(event => {
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
        this.alertService.error('Error: Could not return quizzes');
      });
  }

  private getQuestionBanksWithQuestionsByOutcomeFromServer() {
    this._manageCoursesService.getQuestionBanksWithQuestionsByLessonOutcomeId(this.lesssonOutcomeId).subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this.questionBanks = event.body as N_questionBankWithQuestions[];
        this.buildAddQuizForm();
        this._ngxSpinner.hide();
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.alertService.error('Error: Could not return question banks');
      });
  }

  onGetBankQuestionsCount(bank: N_questionBankWithQuestions) {
    this.bankQuestionLength = bank.questions.length;
  }

  onSubmitQuiz() {
    this.addQuizForm.controls['OutcomeId'].setValue(this.lesssonOutcomeId);

    if (this.NumberOfQuestions.value > this.bankQuestionLength) {
      this.openSnackBar("Error!", "Number Of Questions cannot be more than  " + this.bankQuestionLength, 3000)
      return;
    }
    if (this.addQuizForm.valid) {
      this._manageCoursesService.addQuiz(this.addQuizForm.value)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this._ngxSpinner.show();
          }
          if (event.type === HttpEventType.Response) {
            this._ngxSpinner.hide();
            this.getOutcomeQuizzesFromServer();
            this.openSnackBar("Add Quiz", "Success!", 3000);
          }
        },
          error => {
            this._ngxSpinner.hide();
            this.alertService.error('Server Error:' + error.error.message);
          });
    }
    else {
      this.getFormValidationErrors(this.addQuizForm)
    }

  }

  private buildAddQuizForm() {
    this.addQuizForm = this._formBuilder.group({
      Name: ['', [Validators.required]],
      PassMarkPercentage: ['', [Validators.required, Validators.max(100), Validators.min(51)]],
      DueDate: ['', [Validators.required]],
      NumberOfQuestions: ['', [Validators.required]],
      QuestionBankId: ['', [Validators.required]],
      OutcomeId: ['', []],
    })
  }

  get Name() { return this.addQuizForm.get('Name') }
  get PassMarkPercentage() { return this.addQuizForm.get('PassMarkPercentage') }
  get DueDate() { return this.addQuizForm.get('DueDate') }
  get NumberOfQuestions() { return this.addQuizForm.get('NumberOfQuestions') }
  get QuestionBankId() { return this.addQuizForm.get('QuestionBankId') }
  get OutcomeId() { return this.addQuizForm.get('OutcomeId') }

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
