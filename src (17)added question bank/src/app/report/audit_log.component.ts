import { Audit_Log } from './../_models/audit_log';
import {Moment} from 'moment';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Audit_LogService, AlertService } from '../_services';
import * as moment from 'moment';

@Component({ 
    templateUrl: 'audit_log.component.html',
    styleUrls: ['./ss_report.component.css'] 
})

export class Audit_LogComponent implements OnInit {
  myDateValue!: Date;
  toDate!: Date;
  duplicateArray: any [] = [];
  
   ngOnInit() {

    this.loadAll();

    this.myDateValue = new Date("12-08-2019");
    this.duplicateArray=this.audit_log
   }
  
  onDateChange(newDate: Date) {
    console.log(newDate);
  }

   reverseAndTimeStamp(dateString: string) {
        const reverse = new Date(dateString.split("-").reverse().join("-"));
        return reverse.getTime();
    }

    filterDate() {
        let auditLogDatestamp=moment(this.myDateValue).format('DD-MM-YYYY');
      console.log(auditLogDatestamp)
      let todate=moment(this.toDate).format('DD-MM-YYYY');
      if(this.myDateValue && this.toDate){
      const selectedMembers = this.audit_log.filter(m => {
            return this.reverseAndTimeStamp(m.auditLogDatestamp) >= this.reverseAndTimeStamp(auditLogDatestamp) && this.reverseAndTimeStamp(m.auditLogDatestamp) <= this.reverseAndTimeStamp(todate)
        }
      );
      this.duplicateArray=selectedMembers
      }
      else{
        this.duplicateArray=this.audit_log
      }  
      console.log(this.duplicateArray); // the result objects
    }

  audit_log: any[] = [];

  searchText = '';

  constructor(
      private audit_logService: Audit_LogService,
      private alertService: AlertService
  ) {

  }

  model = {
    AuditLogId: 0,
    UserId: 0,
    AuditLogDatestamp: '',
    AuditLogTimestamp: '',
    AuditLogDescription: ''
  }

  testData(){
    this.audit_log.push(
      {
        AuditLogId: 2,
        UserId: 43,
        AuditLogDatestamp: '12-03-2019',
        AuditLogTimestamp: '',
        AuditLogDescription: ''
      },
      {
        AuditLogId: 2,
        UserId: 43,
        AuditLogDatestamp: '12-03-2021',
        AuditLogTimestamp: '',
        AuditLogDescription: ''
      },
      {
        AuditLogId: 2,
        UserId: 43,
        AuditLogDatestamp: '12-05-2019',
        AuditLogTimestamp: '',
        AuditLogDescription: ''
      }
    );
  }

  private loadAll() {
    this.audit_logService.getAllAudit_Log()
    .pipe(first())
    .subscribe(
      audit_log => {
        this.audit_log = audit_log;
      },
      error => {
        this.alertService.error('Error, Data (Audit Log) was unsuccesfully retrieved');
      } 
    );
  }

}
