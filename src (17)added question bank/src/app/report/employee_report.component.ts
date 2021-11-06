
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { EmployeeService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'employee_report.component.html',
    styleUrls: ['./ss_report.component.css'] 
})

export class Employee_ReportComponent implements OnInit {
  employee: any[] = [];

  searchText = '';

  constructor(
      private employeeService: EmployeeService,
      private alertService: AlertService
  ) {

  }

  ngOnInit() { 
      this.loadAll();
  }

  private loadAll() {
    this.employeeService.getAllEmployee()
    .pipe(first())
    .subscribe(
      employee => {
        this.employee = employee;
      },
      error => {
        this.alertService.error('Error, Data (Employee) was unsuccesfully retrieved');
      } 
    );
  }

  jsondatadisplay:any;

  getJsonData(){
    this.jsondatadisplay = JSON.stringify(this.employee);
  }

}