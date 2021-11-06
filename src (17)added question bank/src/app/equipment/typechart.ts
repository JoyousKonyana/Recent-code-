import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { Label } from 'ng2-charts';
import { AlertService, EquipmentService } from '../_services';

import { first } from 'rxjs/operators';
 
@Component({
  selector: 'typechart',
  templateUrl: './typechart.html'
})
export class TypeChartComponent {
  

    constructor(
        private equipmentService: EquipmentService,
        private alertService: AlertService,
    ) {
    }

    ngOnInit() { 
        this.loadAll();
       
    }
    equipment: any[] = [];

    type1: any[] = [];
    type2: any[] = [];
    type3: any[] = [];
    type4: any[] = [];

    LaptopValue:number = 1;
    PhoneValue = 0;
    TabletValue = 0;
    EarphoneValue = 0;
    
     loadAll() {
      this.equipmentService.getAllEquipment()
      .pipe(first())
      .subscribe(
        equipment => {
          this.equipment = equipment;

          this.type1 = this.equipment.filter((obj) => { return obj.equipmentTypeId == 1 } )
          this.LaptopValue = this.type1.length;
          this.type2 = this.equipment.filter((obj) => { return obj.equipmentTypeId == 2 } )
          this.PhoneValue = this.type2.length;;
          this.type3 = this.equipment.filter((obj) => { return obj.equipmentTypeId == 3 } )
          this.TabletValue = this.type3.length;
          this.type4 = this.equipment.filter((obj) => { return obj.equipmentTypeId == 4 } )
          this.EarphoneValue = this.type4.length;

          this.barChartData= [
            {
            data: [this.LaptopValue, this.PhoneValue, this.TabletValue, this.EarphoneValue],
            label: 'Equipment Type'
            }
          ];
        
        },
        error => {
          this.alertService.error('Error, Data (Equipment) was unsuccesfully retrieved');

          this.barChartData = [
            {
            label: 'Equipment Type'
            }
          ];
        } 
      );
    }

    public barChartOptions: ChartOptions = {responsive: true,};
  public barChartLabels: Label[] = ['Laptop', 'Phone', 'Tablet', 'EarPhones'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  barChartData: ChartDataSets[] = [];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}