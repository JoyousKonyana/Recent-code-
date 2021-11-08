
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Onboarder, Course, Onboarder_Course_Enrollment } from '../_models';
import { OnboarderService, CourseService, Onboarder_Course_EnrollmentService, AuthenticationService, AlertService } from '../_services';

import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { ManageCoursesService } from '../_services/manage-courses/manage-courses.service';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'assign_course.component.html',
  styleUrls: ['./ss_course.component.css']
})

export class Assign_CourseComponent implements OnInit {
  onboarder: any[] = [];
  course: any[] = [];

  addEnrollmentForm: FormGroup;

  constructor(
    private onboarderService: OnboarderService,
    private courseService: CourseService,
    private onboarder_course_enrollmentService: Onboarder_Course_EnrollmentService,

    private alertService: AlertService,
    private form: FormBuilder,
    private _manageCoursesService: ManageCoursesService,
    private _ngxSpinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) {

    this.buildAddEnrollmentForm();
  }

  ngOnInit() {
    this.loadAll();

  }

  private loadAll() {
    this.courseService.getAllCourse()
      .pipe(first())
      .subscribe(
        course => {
          this.course = course;
        },
        error => {
          this.alertService.error('Error, Data (Course) was unsuccesfully retrieved');
        }
      );

    this.onboarderService.getAllOnboarder()
      .pipe(first())
      .subscribe(
        onboarder => {
          this.onboarder = onboarder;
        },
        error => {
          this.alertService.error('Error, Data (Onboarder) was unsuccesfully retrieved');
        }
      );
  }


  onAddSubmit() {

    if (this.addEnrollmentForm.valid) {
      console.log(this.addEnrollmentForm.value)

      this._manageCoursesService.addOnborderEnrollment(this.addEnrollmentForm.value)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this._ngxSpinner.show();
          }
          if (event.type === HttpEventType.Response) {
            this._ngxSpinner.hide();
            this.openSnackBar("Add Enrollement", "Success!", 3000);
            this._router.navigate(['/course/enrollments', this.CourseId.value]);
          }
        },
          error => {
            this._ngxSpinner.hide();
            this.openSnackBar("Error", error.error.message, 3000);
          });
    }
  }

  private buildAddEnrollmentForm() {
    this.addEnrollmentForm = this.form.group({
      CourseId: ['', [Validators.required]],
      OnborderId: ['', [Validators.required]],
      EnrollmentDate: ['', [Validators.required]],
    });
  }

  get CourseId() { return this.addEnrollmentForm.get('CourseId') }
  get OnborderId() { return this.addEnrollmentForm.get('OnborderId') }
  get EnrollmentDate() { return this.addEnrollmentForm.get('EnrollmentDate') }

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
