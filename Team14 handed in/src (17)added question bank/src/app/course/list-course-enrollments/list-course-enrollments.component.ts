import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_services';
import { ManageCoursesService } from 'src/app/_services/manage-courses/manage-courses.service';
import { N_courseDetails, N_Enrollement, N_questionBankWithQuestions, N_questionInBank } from 'src/app/_services/manage-courses/manage-courses.types';
import { ListQuestionAnswersComponent } from '../list-question-answers/list-question-answers.component';

@Component({
  selector: 'app-list-course-enrollments',
  templateUrl: './list-course-enrollments.component.html',
  styleUrls: ['./list-course-enrollments.component.css']
})
export class ListCourseEnrollmentsComponent implements OnInit {

  courseId;
  courseDetails:N_courseDetails;
  enrollments: N_Enrollement[] = [];
  constructor(
    private alertService: AlertService,
    private _activatedRoute: ActivatedRoute,
    private _manageCoursesService: ManageCoursesService,
    private _ngxSpinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    this.courseId = this._activatedRoute.snapshot.params["courseId"];
  }

  ngOnInit(): void {
    this.getCourseDetails()
    this.getQuestionBankFromServer();
  }

  private getQuestionBankFromServer() {
    this._manageCoursesService.getEnrollmentsByCourseId(this.courseId).subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this.enrollments = event.body as N_Enrollement[];
        this._ngxSpinner.hide();
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.alertService.error('Error: Course Enrollments not found');
      });
  }

  private getCourseDetails() {
    this._manageCoursesService.getCourseDetails(this.courseId).subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this.courseDetails = event.body as N_courseDetails;
        this._ngxSpinner.hide();
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.alertService.error('Error: Course Enrollments not found');
      });
  }

  onViewQuestionAnswers(question: N_questionInBank) {
    let dialogRef = this._dialog.open(ListQuestionAnswersComponent, {
      width: "80%",
      height: "auto",
      data: {
        question: question
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getQuestionBankFromServer();
    });
  }

}
