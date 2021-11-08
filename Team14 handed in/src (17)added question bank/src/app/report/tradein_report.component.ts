import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { EquipmentService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'tradein_report.component.html',
    styleUrls: ['./ss_report.component.css'] 
})

export class TradeIn_ReportComponent implements OnInit {
  barChartData: ChartDataSets[] = [];

  constructor(
      private equipmentService: EquipmentService,
      private alertService: AlertService
  ) {

  }

  ngOnInit() { 
    this.loadAll();
   
}

equipment: any[] = [];

status1: any[] = [];
status2: any[] = [];

TradedIn: number = 1;
Not_TradedIn: number = 0;

 loadAll() {
  this.equipmentService.getAllEquipment()
  .pipe(first())
  .subscribe(
    equipment => {
      this.equipment = equipment;
    
    },
    error => {
      this.alertService.error('Error, Data (Equipment) was unsuccesfully retrieved');
    });

      this.status1 = this.equipment.filter((obj) => { return obj.equipmentTradeInStatusId == 1 } )
      this.TradedIn = this.status1.length;
      this.status2 = this.equipment.filter((obj) => { return obj.equipmentTradeInStatusId == 2 } )
      this.Not_TradedIn = this.status2.length;;

      this.barChartData= [
        {
        data: [this.TradedIn, this.Not_TradedIn],
        label: 'Equipment Trade In Status'
        }
      ];
  
}

public barChartOptions: ChartOptions = {responsive: true,};
public barChartLabels: Label[] = ['Traded In', 'Not Traded In'];
public barChartType: ChartType = 'bar';
public barChartLegend = true;


// events
public chartClicked(e:any):void {
console.log(e);
}

public chartHovered(e:any):void {
console.log(e);
}

}