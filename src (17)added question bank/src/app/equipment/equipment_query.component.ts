import { ResolveQuery } from './../_models/resolvequery';
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
  queryStatusId: any;

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
      console.log(this.x)
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

  model2: ResolveQuery = {
    EquipmentQueryId: 0,
    EquipmentQueryStatusId: ''
  }; 

  myValue = 0;

  editReport_Query(editReport_QueryInfo: number) {
    // this.newReport_QueryClicked = !this.newReport_QueryClicked;
    // this.myValue = editReport_QueryInfo;
    this.yService.deletequery(editReport_QueryInfo)
    .pipe(first())
    .subscribe(
        data => {
            this.alertService.success('Query status was updated successfully', true);
            this.loadAll()
        },
        error => {
            this.alertService.error('Error, Query status was unsuccesfully updated');
        });
    this.loadAll();
  }

  // Report_Query() {
  //   let editReport_QueryInfo = this.myValue;

  //   this.model2.EquipmentQueryId  = this.x[editReport_QueryInfo].EquipmentQueryId;
  //   this.model2.EquipmentQueryStatusId = this.queryStatusId;

  //   this.yService.deletequery(this.model2)
  //           .pipe(first())
  //           .subscribe(
  //               data => {
  //                   this.alertService.success('Query status was updated successfully', true);
  //                   this.loadAll()
  //               },
  //               error => {
  //                   this.alertService.error('Error, Query status was unsuccesfully updated');
  //               });

  //   this.newReport_QueryClicked = !this.newReport_QueryClicked;
  // }

  CloseReport_QueryBtn() {
    this.newReport_QueryClicked = !this.newReport_QueryClicked;
  }

}