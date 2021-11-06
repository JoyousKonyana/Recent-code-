import { Option } from './../_models/option';
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
    templateUrl: 'option.component.html',
    styleUrls: ['./ss_course.component.css'] 
})

export class OptionComponent implements OnInit {
  option: any[] = [];

  searchText = '';
  id: any;

  constructor(
      private quizService: QuizService,
      private courseService: CourseService,
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
    this.quizService.getOptionById(this.id)
    .pipe(first())
    .subscribe(
      option => {
        this.option = option;
      },
      error => {
        this.alertService.error('Error, Data (Option) was unsuccesfully retrieved');
      } 
    );
  }

    newOptionClicked = false;
    updateOptionClicked = false;

  model: any = {};
  model2: any = {}; 

  model3:Option = {
      OptionId: 0,
      OptionNo: 0,
      OptionDescription: '',
      QuestionId: 0
  };

  addOption() { 
    if(Object.keys(this.model).length < 2)
    {
      this.alertService.error("Error, you have an empty feild");
      this.newOptionClicked = !this.newOptionClicked;
      this.model = {};
    }
    else if((Object.keys(this.model).length==2))
    {
      this.model3.QuestionId = this.id;
      this.model3.OptionDescription = this.model.OptionDescription;
      this.model3.OptionNo = this.model.OptionNo;
    
      this.quizService.createOption(this.model3)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Creation (Option) was successful', true);
                   this.loadAll();
                    this.newOptionClicked = !this.newOptionClicked;
                    this.model = {};
                },
                error => {
                    this.alertService.error('Error, Creation (Option) was unsuccesful');
                });
    }
  }
    
  
  deleteOption(i: number) {
    this.quizService.deleteOption(i)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Deletion (Option) was successful', true);
                    this.loadAll();
                },
                error => {
                    this.alertService.error('Error, Deletion (Option) was unsuccesful');
                });
  }

  myValue = 0;

  editOption(editOptionInfo: number) {
    this.model2.OptionDescription = this.option[editOptionInfo].optionDescription;
    this.model2.QuestionAnswer = this.option[editOptionInfo].QuestionAnswer;
    this.myValue = editOptionInfo;
  }

  updateOption() {
    let editOptionInfo = this.myValue;

    this.model3.QuestionId = this.id;
    this.model3.OptionNo = this.model2.OptionNo;
    this.model3.OptionDescription = this.model2.OptionDescription;

    for(let i = 0; i < this.option.length; i++) {
      if(i == editOptionInfo) 
      {
        this.quizService.updateOption(this.option[editOptionInfo].optionId, this.model3)
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

    addNewOptionBtn() {
        this.newOptionClicked = !this.newOptionClicked;
      }

      

}