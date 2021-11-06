import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_services';
import { ManageCoursesService } from 'src/app/_services/manage-courses/manage-courses.service';
import { N_AnswerOption, N_questionInBank } from 'src/app/_services/manage-courses/manage-courses.types';

@Component({
  selector: 'app-add-question-answer',
  templateUrl: './add-question-answer.component.html',
  styleUrls: ['./add-question-answer.component.css']
})
export class AddQuestionAnswerComponent implements OnInit {

  question: N_questionInBank;

  constructor(
    public dialogRef: MatDialogRef<AddQuestionAnswerComponent>,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _manageCoursesService: ManageCoursesService,
    private _ngxSpinner: NgxSpinnerService,
    private alertService: AlertService,

  ) {
    this.question = dataFromParent.question;
  }

  answerOptionsList: any[] = [];
  formToSendToServer: any = {};

  ngOnInit(): void {
  }

  onAddOptionToList(option: string, correct: any) {

    if (option == '') {
      this.openSnackBar("Error", "Provide answer option text!", 3000);
      return;
    }

    let questionObj: any = {}

    questionObj.Name = option;
    questionObj.Correct = correct;

    this.answerOptionsList.push(questionObj);

  }

  onRemoveOptionToList(option: any) {
    let index = this.answerOptionsList.indexOf(option);
    if (index > -1) {
      this.answerOptionsList.splice(index, 1);
    }
  }

  onSbumitOptions() {
    var listHasCorrectOption = false;
    var optionsMarkedAsCorrectCount = 0;

    if (this.answerOptionsList.length < 2) {
      this.openSnackBar("Error", "You should have a minimum of two options", 3000);
      console.log("Yes")
      return;
    }

    this.answerOptionsList.forEach(option => {

      if (option.Correct == 'Yes') {
        listHasCorrectOption = true;
        optionsMarkedAsCorrectCount += 1;
      }

    });

    if (listHasCorrectOption == false) {
      this.openSnackBar("Error", "One option must be marked as the answer", 3000);
      return;
    }

    if (optionsMarkedAsCorrectCount != 1) {
      this.openSnackBar("Error", "Only one option must be marked as correct", 3000);
      return;
    }


    this.formToSendToServer["Options"] = this.answerOptionsList;
    this.formToSendToServer["QuestionId"] = this.question.id;


    this._manageCoursesService.addQuestionAnswerOptions(this.formToSendToServer)
      .subscribe(event => {
        if (event.type === HttpEventType.Sent) {
          this._ngxSpinner.show();
        }
        if (event.type === HttpEventType.Response) {
          this._ngxSpinner.hide();
          this.openSnackBar("Add Answer Options", "Success!", 3000);
          this.closeDialog();
        }
      },
        error => {
          this._ngxSpinner.hide();
          this.openSnackBar("Error:", error.error.message, 3000);

        });
  }



  private validateAnswerOptions() {

  }

  private openSnackBar(message: string, action: string, _duration: number) {
    this._snackBar.open(message, action, {
      duration: _duration,
      verticalPosition: 'top'
    });
  }

  private closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
