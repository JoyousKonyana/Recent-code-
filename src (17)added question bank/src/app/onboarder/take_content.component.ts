import { Lesson_ContentService } from './../_services/lesson_conent.service';
import { Learning_ContentComponent } from './../course/learning_content.component';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Router,ActivatedRoute } from '@angular/router';
import { AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { Lesson_Content } from '../_models';

@Component({
  templateUrl: './take_content.component.html'
})

export class Take_ContentComponent {
  lesson_content: any = {};
  content: any = {};

  id: any;

  ngOnInit() { 
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
    });

    this.loadAll();
}

model: Lesson_Content = {
  LessonConentId: 0,
  LessonContenetTypeId: 0,
  LessonOutcomeId: 0,
  ArchiveStatusId: 0,
  LessonContentDescription: '',
  LessonContent1: ''
}

  loadAll() {
    this.lesson_contentService.getLesson_ContentByLessonoutcomeId(this.id)
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

    constructor(
      private _Activatedroute:ActivatedRoute,
      private _router:Router,
      private alertService: AlertService,
      private lesson_contentService: Lesson_ContentService,
      
    ) {
    }

    get isNotArchieved() {
      return this.lesson_content.archiveStatusId  === 1;
    }
    get isArchieved() {
      return this.lesson_content.archiveStatusId  === 2;
    }
}
