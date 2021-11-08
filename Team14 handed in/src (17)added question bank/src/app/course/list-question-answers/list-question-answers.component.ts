import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManageCoursesService } from 'src/app/_services/manage-courses/manage-courses.service';
import { N_AnswerOption, N_questionInBank } from 'src/app/_services/manage-courses/manage-courses.types';
import { AddQuestionAnswerComponent } from '../add-question-answer/add-question-answer.component';

@Component({
  selector: 'app-list-question-answers',
  templateUrl: './list-question-answers.component.html',
  styleUrls: ['./list-question-answers.component.css']
})
export class ListQuestionAnswersComponent implements OnInit {
  question: N_questionInBank;
  answerOptions: N_AnswerOption[] = [];


  constructor(
    public dialogRef: MatDialogRef<ListQuestionAnswersComponent>,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _manageCoursesService: ManageCoursesService,
    private _ngxSpinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,

  ) {
    this.question = dataFromParent.question;
  }

  ngOnInit(): void {
    this.getAllAnswerOptionsFromServer();
  }

  onViewAddAnswerOptionsModal() {
    let dialogRef = this._dialog.open(AddQuestionAnswerComponent, {
      width: "80%",
      height: "auto",
      data: {
        question: this.question
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getAllAnswerOptionsFromServer();
    });
  }

  private getAllAnswerOptionsFromServer() {
    this._manageCoursesService.getQuestionAnswerOptions(this.question.id).subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this.answerOptions = event.body as N_AnswerOption[];
        this._ngxSpinner.hide();
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.openSnackBar("Error:", error.error.message, 3000);
      });
  }

  private openSnackBar(message: string, action: string, _duration: number) {
    this._snackBar.open(message, action, {
      duration: _duration,
      verticalPosition: 'top'
    });
  }

}
