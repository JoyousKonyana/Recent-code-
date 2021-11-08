import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Question } from 'src/app/_models';
import { QuestionBank } from 'src/app/_models/QuestionBank';
import { QuizService, AlertService, CourseService, Learning_OutcomeService, LessonService } from 'src/app/_services';
import { ManageCoursesService } from 'src/app/_services/manage-courses/manage-courses.service';
import { N_questionBank } from 'src/app/_services/manage-courses/manage-courses.types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'question_bank.component.html',
  styleUrls: ['question_bank.component.css']
})

export class Question_BankComponent implements OnInit {
  question: any[] = [];
  course: any[] = [];
  lesson: any[] = [];
  lessonOutcome: any[] = [];
  searchText = '';
  selectedCourseId: number = 0;

  questionBanks: N_questionBank[] = [];

  addQuestionBankForm: FormGroup;
  questionsAddedToBank: any[] = [];
  formToSendToServer: any = {};


  constructor(
    private quizService: QuizService,
    private alertService: AlertService,
    private courseService: CourseService,
    private lessonOutcomeService: Learning_OutcomeService,
    private lessonService: LessonService,
    private form: FormBuilder,
    private _manageCoursesService: ManageCoursesService,
    private _ngxSpinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _router: Router

  ) {

    this.buildAddQuestionBankForm();
  }



  ngOnInit() {
    this.getAllQuestionBooksByFromServer();
    this.loadAll();
  }



  private loadAll() {
    //getCourse
    this.courseService.getAllCourse()
      .pipe(first())
      .subscribe(
        course => {
          this.course = course
        },
        error => {
          this.alertService.error('Error, Could not return courses');
        }
      );

    //get all lessons
    this.lessonService.getAllLessons2()
      .pipe(first())
      .subscribe(
        lesson => {
          this.lesson = lesson
        },
        error => {
          this.alertService.error('Error, Could not return lessons');
        }
      );

    // get all lesson outcomes
    this.lessonOutcomeService.getAllLearning_Outcome2()
      .pipe(first())
      .subscribe(
        lessonOutcome => {
          this.lessonOutcome = lessonOutcome
        },
        error => {
          this.alertService.error('Error,Could not return lesson outcomes');
        }
      );
  }

  onSelectCourse(course: any) {
    this.selectedCourseId = course.value;
    this.lessonService.getAllLessons2()
      .pipe(first())
      .subscribe(
        lesson => {
          this.lesson = lesson;
          this.lesson = lesson.filter(e => e.courseID == course.value);
        },
        error => {
          this.alertService.error('Error, Data (Question) was unsuccesfully retrieved');
        }
      );
  }

  onSelectlesson(state: any) {
    this.lessonOutcomeService.getAllLearning_Outcome2()
      .pipe(first())
      .subscribe(
        lessonOutcome => {
          this.lessonOutcome = lessonOutcome.filter(e => e.lessonID == state.value);
        },
        error => {
          this.alertService.error('Error, Data (Question) was unsuccesfully retrieved');
        }
      );
  }

  oNClickLessonTreeItem() {
    if (this.selectedCourseId == 0) {
      this.alertService.error('Error, Select Course First to get filtered lessons');

      this.delay(3000).then(any => {
        this.alertService.clear();
      });
    }
  }
  newQuestionClicked = false;
  updateQuestionClicked = false;

  model: any = {};
  model2: any = {};

  model3: Question = {
    QuestionId: 0,
    QuizId: 1,
    QuestionCategoryId: 4,
    QuestionDescription: '',
    QuestionAnswer: '',
    QuestionMarkAllocation: 1
  };

  mquestionBankmodel: QuestionBank = {
    CourseId: 0,
    LessonId: 0,
    LessonOutcomeId: 0,
    QuestionBankDescription: ''
  }



  deleteQuestion(i: number) {
    this.quizService.deleteQuestion(i)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Deletion (Question) was successful', true);
          this.loadAll();
        },
        error => {
          this.alertService.error('Error, Deletion (Question) was unsuccesful');
        });
  }

  myValue = 0;

  editQuestion(editQuestionInfo: number) {
    this.model2.QuestionDescription = this.question[editQuestionInfo].QuestionDescription;
    this.model2.QuestionAnswer = this.question[editQuestionInfo].QuestionAnswer;
    this.model2.QuestionMarkAllocation = this.question[editQuestionInfo].QuestionMarkAllocation;
    this.model2.QuestionMarkAllocation = this.question[editQuestionInfo].quizId
    this.myValue = editQuestionInfo;
  }

  updateQuestion() {
    let editQuestionInfo = this.myValue;

    this.model3.QuestionDescription = this.model2.QuestionDescription;
    this.model3.QuestionAnswer = this.model2.QuestionAnswer;
    this.model3.QuestionMarkAllocation = this.model2.QuestionMarkAllocation;
    this.model3.QuizId = this.model2.QuizId;

    for (let i = 0; i < this.question.length; i++) {
      if (i == editQuestionInfo) {
        this.quizService.updateQuiz(this.question[editQuestionInfo].questionId, this.model3)
          .pipe(first())
          .subscribe(
            data => {
              this.alertService.success('Update was successful', true);
              this.loadAll();
            },
            error => {
              this.alertService.error('Error, Update was unsuccesful');
            });
      }
    }

  }

  addNewQuestionBtn() {
    this.newQuestionClicked = !this.newQuestionClicked;
  }

  onAddQuestionToBank(question: string) {
    let questionObj: any = {}

    questionObj.Name = question;

    this.questionsAddedToBank.push(questionObj);
  }

  onRemoveQuestionFromBank(question: any) {
    let index = this.questionsAddedToBank.indexOf(question);
    if (index > -1) {
      this.questionsAddedToBank.splice(index, 1);
    }
  }

  private prepareFormToSendToServer() {
    this.formToSendToServer['Name'] = this.Name.value;
    this.formToSendToServer['LessonOutcomeId'] = this.LessonOutcomeId.value;
    this.formToSendToServer['Questions'] = this.questionsAddedToBank;

  }

  onSubmitAddQuestionBank() {
    if (this.questionsAddedToBank.length < 2) {
      this.openSnackBar("Error", "Bank should have a minimum of 2 questions!", 3000);
      return;
    }
    if (this.addQuestionBankForm.valid) {
      this.prepareFormToSendToServer();
      this.alertService.clear();

      this._manageCoursesService.addQuestionBank(this.formToSendToServer)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this._ngxSpinner.show();
          }
          if (event.type === HttpEventType.Response) {
            this._ngxSpinner.hide();
            this.getAllQuestionBooksByFromServer();
            this.openSnackBar("Add Question Bank", "Success!", 3000);
          }
        },
          error => {
            this._ngxSpinner.hide();
            this.alertService.error('Server Error:' + error.error.message);
          });
    }
    else {
      this.alertService.error('Input Error: Provid all required fields');

    }
  }

  onManageBankQuestions(bank: N_questionBank) {
    this._router.navigate(['/manage-bank-questions/', bank.id])
  }


  private getAllQuestionBooksByFromServer() {
    this._manageCoursesService.getAllQuestionBanks().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this.questionBanks = event.body as N_questionBank[];
        this._ngxSpinner.hide();
        this.newQuestionClicked = false;
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.alertService.error('Error: Could not return question banks');
      });
  }

  private buildAddQuestionBankForm() {
    this.addQuestionBankForm = this.form.group({
      CourseId: ['', [Validators.required]],
      LessonId: ['', [Validators.required]],
      LessonOutcomeId: ['', [Validators.required]],
      Name: ['', [Validators.required]]
    });
  }

  get CourseId() { return this.addQuestionBankForm.get('CourseId') }
  get LessonId() { return this.addQuestionBankForm.get('LessonId') }
  get LessonOutcomeId() { return this.addQuestionBankForm.get('LessonOutcomeId') }
  get Name() { return this.addQuestionBankForm.get('Name') }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private openSnackBar(message: string, action: string, _duration: number) {
    this._snackBar.open(message, action, {
      duration: _duration,
      verticalPosition: 'top'
    });
  }
}
