import { Learning_OutcomeService } from './../_services/learning_outcome.service';
import { Question } from './../_models/question';
import { QuizService } from './../_services/quiz.service';
import { CourseService } from './../_services/course.service';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Lesson } from '../_models';
import { LessonService, AuthenticationService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'question.component.html',
    styleUrls: ['./ss_course.component.css'] 
})

export class QuestionComponent implements OnInit {
  question: any[] = [];

  searchText = '';
  id: any;

  constructor(
      private quizService: QuizService,
      private courseService: CourseService,
      private lessonOutcomeService: Learning_OutcomeService,
      private lessonService:LessonService,
      private alertService: AlertService,

      private _Activatedroute:ActivatedRoute,
      private router: Router
  ) {
    //this.id = this.router.getCurrentNavigation().extras.state.example
  }

  ngOnInit() { 
      this._Activatedroute.paramMap.subscribe(params => { 
        this.id = params.get('id'); 
      });

      this.loadAll();
  }

  private loadAll() {
    this.quizService.getQuestionByQuizID(this.id)
    .pipe(first())
    .subscribe(
      question => {
        this.question = question;
      },
      error => {
        this.alertService.error('Error, Data (Question) was unsuccesfully retrieved');
      } 
    );
  }

    newQuestionClicked = false;
    updateQuestionClicked = false;

  model: any = {};
  model2: any = {}; 

  model3:Question = {
      QuestionId: 0,
      QuizId: 0,
      QuestionCategoryId: 4,
      QuestionDescription: '',
      QuestionAnswer: '',
      QuestionMarkAllocation: 1
  };

  addQuestion() { 
    if(Object.keys(this.model).length < 3)
    {
      this.alertService.error("Error, you have an empty feild");
      this.newQuestionClicked = !this.newQuestionClicked;
      this.model = {};
    }
    else if((Object.keys(this.model).length==3))
    {
      this.model3.QuizId = this.id;
      this.model3.QuestionDescription = this.model.QuestionDescription;
      this.model3.QuestionAnswer = this.model.QuestionAnswer;
      this.model3.QuestionMarkAllocation = this.model.QuestionMarkAllocation;
    
      this.quizService.createQuestion(this.model3)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Creation (Question) was successful', true);
                   this.loadAll();
                    this.newQuestionClicked = !this.newQuestionClicked;
                    this.model = {};
                },
                error => {
                    this.alertService.error('Error, Creation (Question) was unsuccesful');
                });
    }
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
    this.updateQuestionClicked = !this.updateQuestionClicked;
    
    this.model2.QuestionDescription = this.question[editQuestionInfo].questionDescription;
    this.model2.QuestionAnswer = this.question[editQuestionInfo].questionAnswer;
    this.model2.QuestionMarkAllocation = this.question[editQuestionInfo].questionMarkAllocation;
    this.myValue = editQuestionInfo;
  }

  updateQuestion() {
    let editQuestionInfo = this.myValue;

    this.model3.QuizId = this.id;
    this.model3.QuestionAnswer = this.model2.QuestionAnswer;
    this.model3.QuestionDescription = this.model2.QuestionDescription;
    this.model3.QuestionMarkAllocation = this.model2.QuestionMarkAllocation;

    for(let i = 0; i < this.question.length; i++) {
      if(i == editQuestionInfo) 
      {
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

      

}