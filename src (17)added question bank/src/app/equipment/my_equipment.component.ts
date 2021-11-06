

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { AssignEquipment, Equipment_Query, EquipmentQuery } from '../_models';
import { EquipmentService, Equipment_QueryService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'my_equipment.component.html',
    styleUrls: ['./ss_equipment.component.css'] 
})

export class My_EquipmentComponent implements OnInit {

  x!: any;
  y: Equipment_Query[] = [];
  query: any = {};

  constructor(
    private xService: EquipmentService,
    private alertService: AlertService,
    private yService: Equipment_QueryService,
) {

}

ngOnInit() { 
    this.loadAll();
}

private loadAll() {
  this.xService.GetAssignedEquipment(1)
  .pipe(first())
  .subscribe(
    x => {
      this.x = x;
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
    EquipmentQueryDescription: '',
    EquipmentQueryDate: '',
    OnboarderId: 0
  }; 

  myValue = 0;

  editReport_Query(editReport_QueryInfo: number) {
    this.newReport_QueryClicked = !this.newReport_QueryClicked;
    this.myValue = editReport_QueryInfo;

    this.xService.GetAssignedEquipment(editReport_QueryInfo)
      .pipe(first())
      .subscribe(
        query => {
          query = query;
        },
        error => {
          this.alertService.error('Error, Data was unsuccesfully retrieved');
        } 
      );

    this.model.EquipmentQueryDescription = this.query.equipmentQueryDescription;
    this.model.EquipmentQueryDate = this.query.equipmentQueryDate;
    this.myValue = editReport_QueryInfo;
  }
  

  updateReport_Query() {
    let editReport_QueryInfo = this.myValue;

        // this.yService.create(this.model2)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Report was successful', true);
        //             this.loadAll()
        //         },
        //         error => {
        //             this.alertService.error('Error, Report was unsuccesful');
        //         });

    // for(let i = 0; i < this.x.length; i++) {

    //   if(i == editReport_QueryInfo) 
    //   {
    
    //   }
    // }

    this.newReport_QueryClicked = !this.newReport_QueryClicked;
  }

  CloseReport_QueryBtn() {
    this.newReport_QueryClicked = !this.newReport_QueryClicked;
  }

}