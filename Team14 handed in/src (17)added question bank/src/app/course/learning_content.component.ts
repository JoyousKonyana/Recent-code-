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
    lesson_content: any;

  searchText = '';
  id!: any;

  newLesson_ContentClicked = false;

  model: any = {};
  model2: any = {};

  model3: Lesson_Content = {
      LessonConentId: 0,
      LessonContenetTypeId: 1,
      LessonOutcomeId: 0,
      ArchiveStatusId: 1,
      LessonContentDescription: '',
      LessonContent1: ''
  };


  myValue = 0;


  constructor(
    private lesson_contentService: Lesson_ContentService,
    private alertService: AlertService,

    private _Activatedroute: ActivatedRoute,
    private router: Router,
  ) {
    //this.id = this.router.getCurrentNavigation().extras.state.example
  }

  ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.loadAll();
  }

    loadAll() {
        this.lesson_contentService.getLesson_ContentByLessonoutcomeId(this.id)
            .pipe(first())
            .subscribe(
                lesson_content => {
                this.lesson_content = lesson_content;
                },
                error => {
                this.alertService.error('Error, Could not retrieve course lessons');
                }
            );
    }

  addLesson_Content() {
    if (Object.keys(this.model).length < 2) {
      this.alertService.error("Error, you have an empty feild");
      this.newLesson_ContentClicked = !this.newLesson_ContentClicked;
      this.model = {};
    }
    else if ((Object.keys(this.model).length == 2)) {
      this.model3.LessonOutcomeId = this.id;
      this.model3.LessonContent1 = this.model.LessonContent1;
      this.model3.LessonContentDescription = this.model.LessonContentDescription;

      this.lesson_contentService.create(this.model3)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Creation (Lesson Content) was successful', true);
            this.loadAll();
            this.newLesson_ContentClicked = !this.newLesson_ContentClicked;
            this.model = {};
          },
          error => {
            this.alertService.error('Error, Creation (Lesson Content) was unsuccesful');
          });
    }
  }

  deleteLesson_Content(i: number) {
    this.lesson_contentService.delete(i)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Deletion (Lesson Content) was successful', true);
          this.loadAll();
        },
        error => {
          this.alertService.error('Error, Deletion (Lesson Content) was unsuccesful');
        });
  }

  editLesson_Content(editLesson_ContentInfo: number) {
    this.model2.LessonContent1 = this.lesson_content[editLesson_ContentInfo].LessonContent1;
    this.model2.LessonContentDescription = this.lesson_content[editLesson_ContentInfo].LessonContentDescription;
    this.myValue = editLesson_ContentInfo;
  }

  updateLesson_Content() {
    let editLesson_ContentInfo = this.myValue;

    this.model3.LessonOutcomeId = this.id;
    this.model3.LessonContentDescription = this.model2.LessonContentDescription;
    this.model3.LessonContent1 = this.model2.LessonContent1;

    for (let i = 0; i < this.lesson_content.length; i++) {
      if (i == editLesson_ContentInfo) {
        this.lesson_contentService.update(this.lesson_content[editLesson_ContentInfo].LessonConentId, this.model3)
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

  addNewLesson_ContentBtn() {
    this.newLesson_ContentClicked = !this.newLesson_ContentClicked;
  }
 }