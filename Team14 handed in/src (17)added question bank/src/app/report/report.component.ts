import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { ViewChild, ElementRef } from "@angular/core";

import { Audit_Log } from '../_models';
import { Audit_LogService, AlertService, AuthenticationService } from '../_services';

@Component({ 
    templateUrl: 'report.component.html',
    styleUrls: ['./ss_report.component.css']
})
export class ReportComponent implements OnInit {
    audit_log: Audit_Log[] = [];
    certificate: any = {};

    value = '';

    constructor(
        private audit_logService: Audit_LogService,
        private alertService: AlertService
    ) {
  
    }
  
    ngOnInit() { 
        this.loadAllFAQ();
    }
  
    private loadAllFAQ() {
      this.audit_logService.getAllAudit_Log()
      .pipe(first())
      .subscribe(
        audit_log => {
          this.audit_log = audit_log
        },
        error => {
          this.alertService.error('Error, Data was unsuccesfully retrieved');
        } 
      );
    }

    onboarder_report = [
        { name: 'Harry', surname: 'Potter', employee_id: '123456', date_enrolled: '2007', lesson_completed: '2 of 10 Completed', progress: '80%' },
        { name: 'Hermione', surname: 'Granger', employee_id: '123456', date_enrolled: '2005', lesson_completed: '6 of 10 Completed', progress: '40%' },
        { name: 'Ron', surname: 'Weasley', employee_id: '123456', date_enrolled: '2004', lesson_completed: '2 of 10 Completed', progress: '20%' },
        { name: 'Draco', surname: 'Malfoy', employee_id: '123456', date_enrolled: '2002', lesson_completed: '5 of 10 Completed', progress: '40%' },
      ];

    // certificate = [
    //     { name: 'Jaxk', surname: 'Graylish', course: 'Sexual Harrasment Course', completion_date: '13 March 2021', postion: 'junior Developer' },
    // ];

}