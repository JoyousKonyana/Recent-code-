import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_services';
import { ManageCoursesService } from 'src/app/_services/manage-courses/manage-courses.service';
import { N_questionBank, N_questionBankWithQuestions, N_questionInBank } from 'src/app/_services/manage-courses/manage-courses.types';
import { ListQuestionAnswersComponent } from '../list-question-answers/list-question-answers.component';

@Component({
  selector: 'app-manage-bank-questions',
  templateUrl: './manage-bank-questions.component.html',
  styleUrls: ['./manage-bank-questions.component.css']
})
export class ManageBankQuestionsComponent implements OnInit {
  questionBankId
  questionBank: N_questionBankWithQuestions;
  constructor(
    private alertService: AlertService,
    private _activatedRoute: ActivatedRoute,
    private _manageCoursesService: ManageCoursesService,
    private _ngxSpinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    this.questionBankId = this._activatedRoute.snapshot.params["bankId"];
  }

  ngOnInit(): void {
    this.getQuestionBankFromServer();
  }

  private getQuestionBankFromServer() {
    this._manageCoursesService.getQuestionBank(this.questionBankId).subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this.questionBank = event.body as N_questionBankWithQuestions;
        this._ngxSpinner.hide();
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.alertService.error('Error: Question Bank not found');
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
