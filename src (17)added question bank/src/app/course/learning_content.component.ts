import { Lesson_ContentService } from './../_services/lesson_conent.service';
import { Lesson_Content } from './../_models/lesson_content';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({ 
    templateUrl: 'learning_content.component.html',
    styleUrls: ['./ss_course.component.css'] 
})

export class Learning_ContentComponent implements OnInit {

    id: any;

    lesson_content: any;

    constructor(
        private lessoncontentService: Lesson_ContentService,
        private alertService: AlertService,

      private _Activatedroute:ActivatedRoute,
      private router: Router,
      private form: FormBuilder,
  ) {
  }

    ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => { 
        this.id = params.get('id'); 
      });

      this.loadAll();
    }

    loadAll() {
        this.lessoncontentService.getLesson_ContentByLessonoutcomeId(this.id)
        .pipe(first())
        .subscribe(
          lesson_content => {
            this.lesson_content = lesson_content;
          },
          error => {
            this.alertService.error('Error, Data was unsuccesfully retrieved');
          } 
        );
      }

    model: Lesson_Content = {
        LessonConentId: 0,
        LessonContenetTypeId: 0,
        LessonOutcomeId: 0,
        ArchiveStatusId: 0,
        LessonContentDescription: '',
        LessonContent1: ''
    }

    updateItem(e: any) {
        if(e.target.checked){
            this.model.ArchiveStatusId  = 1
        }
        else{
            this.model.ArchiveStatusId  = 2
        }
    }

    submit() {
        this.model.LessonOutcomeId = this.id;

        if(this.id){
            this.lessoncontentService.create(this.model)
                .pipe(first())
                .subscribe(data => {
                    this.alertService.success('Successful Creation')
                }, error => {
                    this.alertService.success('Unsuccessful Creation')
            });
        }
        else{
            this.lessoncontentService.update(this.id, this.model)
                .pipe(first())
                .subscribe(data => {
                    this.alertService.success('Successful Update')
                }, error => {
                    this.alertService.success('Unsuccessful Update')
            });
        }

        
      }

 }