import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Active_LogService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'active_log.component.html',
    styleUrls: ['./ss_report.component.css'] 
})

export class Active_LogComponent implements OnInit {
    active_log: any[] = [];

  searchText = '';

  constructor(
      private active_logService: Active_LogService,
      private alertService: AlertService
  ) {

  }

  ngOnInit() { 
      this.loadAll();
  }

  private loadAll() {
    this.active_logService.getAllActive_Log()
    .pipe(first())
    .subscribe(
      active_log => {
        this.active_log = active_log;
      },
      error => {
        this.alertService.error('Error, Data (Active Log) was unsuccesfully retrieved');
      } 
    );
  }

}