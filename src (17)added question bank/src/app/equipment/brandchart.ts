import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { Label } from 'ng2-charts';
import { AlertService, EquipmentService } from '../_services';

import { first } from 'rxjs/operators';
 
@Component({
  selector: 'brandchart',
  templateUrl: './brandchart.html'
})
export class BrandChartComponent {

  equipment: any[] = [];

    brand1: any[] = [];
    brand2: any[] = [];
    brand3: any[] = [];
    brand4: any[] = [];

    AcerValue = 0;
    LGValue = 0;
    SonyValue = 0;
    LenovoValue = 0;

    public barChartData: ChartDataSets[] = [];

    constructor(
        private equipmentService: EquipmentService,
        private alertService: AlertService,
    ) {
    }

    ngOnInit() { 
        this.loadAll();
    }
    
    loadAll() {
      this.equipmentService.getAllEquipment()
      .pipe(first())
      .subscribe(
        equipment => {
          this.equipment = equipment;

          //Filter On Data types
          this.brand1 = this.equipment.filter((obj) => { return obj.equipmentBrandId == 1 } )
          this.AcerValue = this.brand1.length;
          this.brand2 = this.equipment.filter((obj) => { return obj.equipmentBrandId == 2 } )
          this.LGValue = this.brand2.length;
          this.brand3 = this.equipment.filter((obj) => { return obj.equipmentBrandId == 3 } )
          this.SonyValue = this.brand3.length;
          this.brand4 = this.equipment.filter((obj) => { return obj.equipmentBrandId == 4 } )
          this.LenovoValue = this.brand4.length;

          this.barChartData = [
            {
            data: [this.AcerValue, this.LGValue, this.SonyValue, this.LenovoValue],
            label: 'Equipment Brand'
            }
          ];
        },
        error => {
          this.alertService.error('Error, Data (Equipment) was unsuccesfully retrieved');

          this.barChartData = [
            {
            label: 'Equipment Brand'
            }
          ];
        } 
      );
    }

  public barChartOptions: ChartOptions = {responsive: true,};
  public barChartLabels: Label[] = ['Acer', 'LG', 'Sony', 'Lenovo'];
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