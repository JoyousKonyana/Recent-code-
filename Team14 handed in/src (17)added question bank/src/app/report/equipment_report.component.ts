import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { EquipmentService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'equipment_report.component.html',
    styleUrls: ['./ss_report.component.css'] 
})

export class Equipment_ReportComponent implements OnInit {
  equipment: any[] = [];

  searchText = '';

  constructor(
      private equipmentService: EquipmentService,
      private alertService: AlertService
  ) {

  }

  ngOnInit() { 
      this.loadAll();
  }

  private loadAll() {
    this.equipmentService.getAllEquipment()
    .pipe(first())
    .subscribe(
      equipment => {
        this.equipment = equipment;
      },
      error => {
        this.alertService.error('Error, Data (Equipment) was unsuccesfully retrieved');
      } 
    );
  }

}