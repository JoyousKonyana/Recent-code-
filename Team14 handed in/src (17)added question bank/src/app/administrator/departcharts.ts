import { EmployeeService } from './../_services/employee.service';
import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { Label } from 'ng2-charts';
import { AlertService, EquipmentService } from '../_services';

import { first } from 'rxjs/operators';
 
@Component({
  selector: 'departchart',
  templateUrl: './departcharts.html'
})
export class DepartChartComponent {

  employee: any[] = [];

    dep1: any[] = [];
    dep2: any[] = [];
    dep3: any[] = [];
    dep4: any[] = [];

    HRValue = 0;
    AccountingValue = 0;
    ITValue = 0;
    TechnicianValue = 0;

    constructor(
        private employeeService: EmployeeService,
        private alertService: AlertService,
    ) {
    }

    ngOnInit() { 
        this.loadAll();
    }
    
    loadAll() {
      this.employeeService.getAllEmployee()
      .pipe(first())
      .subscribe(
        employee => {
          this.employee = employee;
          console.log(this.employee);

          //Filter On Data types
         
        },
        error => {
          this.alertService.error('Error, Data (Employee) was unsuccesfully retrieved');
        } 
      );
      this.dep1 = this.employee.filter((obj) => { return obj.departmentId == 1 } )
      this.HRValue = this.dep1.length;
      this.dep2 = this.employee.filter((obj) => { return obj.departmentId == 2 } )
      this.AccountingValue = this.dep2.length;
      this.dep3 = this.employee.filter((obj) => { return obj.departmentId == 3 } )
      this.ITValue = this.dep3.length;
      this.dep4 = this.employee.filter((obj) => { return obj.departmentId == 4 } )
      this.TechnicianValue = this.dep4.length;

      this.barChartData = [
        {
        data: [this.ITValue, this.AccountingValue, this.TechnicianValue, this.HRValue],
        label: 'Department Type'
        }
     ];
      
    }

  public barChartOptions: ChartOptions = {responsive: true,};
  public barChartLabels: Label[] = ['Analytic', 'Development', 'Datawarehouse', 'HR'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}