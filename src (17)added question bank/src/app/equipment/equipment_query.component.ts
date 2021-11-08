import { Query_StatusService } from './../_services/query_status.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { AssignEquipment, Equipment_Query, EquipmentQuery } from '../_models';
import { EquipmentService, Equipment_QueryService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'equipment_query.component.html',
    styleUrls: ['./ss_equipment.component.css'] 
})

export class EquipmentQueryComponent implements OnInit {

  x!: any;
  searchText = '';
  query: any;

  constructor(
    private xService: EquipmentService,
    private queryService: Query_StatusService,
    private alertService: AlertService,
    private yService: Equipment_QueryService,
) {

}

ngOnInit() { 
    this.loadAll();
}

private loadAll() {
  this.yService.getAllEquipment_Query()
  .pipe(first())
  .subscribe(
    x => {
      this.x = x;
    },
    error => {
      this.alertService.error('Error, Data was unsuccesfully retrieved');
    } 
  );

  this.yService.getAllQueryStatus()
      .pipe(first())
      .subscribe(
        query => {
          this.query = query;
        },
        error => {
          this.alertService.error('Error, Data was unsuccesfully retrieved');
        }
      );
}

    newUser_RoleClicked = false;

    newReport_QueryClicked = false;

  model: any = {};

  model2: EquipmentQuery = {
      EquipmentId: 0,
      OnboarderId: 0,
      EquipmentQueryDescription: '',
      EquipmentQueryDate: ''
  }; 

  myValue = 0;

  editReport_Query(editReport_QueryInfo: number) {
    this.newReport_QueryClicked = !this.newReport_QueryClicked;
    this.myValue = editReport_QueryInfo;
  }

  Report_Query() {
    let editReport_QueryInfo = this.myValue;

    this.model2.EquipmentId = this.x[editReport_QueryInfo].EquipmentId;

    this.yService.create(this.model2)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Query was Reported was successfully', true);
                    this.loadAll()
                },
                error => {
                    this.alertService.error('Error, Report was unsuccesful');
                });

    this.newReport_QueryClicked = !this.newReport_QueryClicked;
  }

  CloseReport_QueryBtn() {
    this.newReport_QueryClicked = !this.newReport_QueryClicked;
  }

}