import { Router } from '@angular/router';


import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { AssignEquipment, Equipment_Query, EquipmentQuery } from '../_models';
import { EquipmentService, Equipment_QueryService, AlertService } from '../_services';
import { stringify } from 'querystring';

@Component({ 
    templateUrl: 'my_equipment.component.html',
    styleUrls: ['./ss_equipment.component.css'] 
})

export class My_EquipmentComponent implements OnInit {

  x!: any;
  y: Equipment_Query[] = [];
  query: any = {};

  isChecked = false;

  constructor(
    private xService: EquipmentService,
    private alertService: AlertService,
    private yService: Equipment_QueryService,
    private router: Router
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
      console.log('X: ', x);
    },
    error => {
      this.alertService.error('Error, Data was unsuccesfully retrieved');
    } 
  );
  const myEquipment = localStorage.getItem('my_equipment');
  console.log('My Equipment: ', myEquipment);
  if(!myEquipment) {
    this.isChecked = false;
  } else {
    this.isChecked = true;
  }
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

  editReport_Query(equipmentId: number) {
    this.newReport_QueryClicked = !this.newReport_QueryClicked;
    this.myValue = equipmentId;

    this.xService.GetAssignedEquipment(equipmentId)
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
    this.myValue = equipmentId;
  }
  
equipid:number;
  updateReport_Query() {
    let editReport_QueryInfo = this.myValue;
    const myEquipment = localStorage.getItem('my_equipment');
    console.log('MyEquipment: ', myEquipment);
    const data = JSON.parse(myEquipment);
    console.log('Json Data: ', data);
    const date = new Date().toISOString();

    this.model2.EquipmentId = data.EquipmentId;
    this.model2.OnboarderId = data.OnboarderId;
    this.model2.EquipmentQueryDate = date;

    this.yService.create(this.model2)
        .pipe(first())
        .subscribe(
            data => {
                console.log('data: ', data);
                this.alertService.success('Report was successful', true);
                this.loadAll()
            },
            error => {
                if(error.status === 200) {
                  this.alertService.success('Report was successful', true);
                } else {
                  this.alertService.error('Error, Assign was unsuccesful');
                  console.log('Error: ', error);
                }
              });

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

  checkEquipment(equipment) {
    console.log('Clicked..');
    const date = new Date().toISOString();
    const data = {
      EquipmentId: equipment.equipmentId,
      OnboarderId: equipment.onboarderID,
      EquipmentCheckInDate: date,
      EquipmentCheckInCondition: equipment.equipmentCheckInCondition
    };
    this.yService.checkEquipment(data)
      // .pipe(first())
      .subscribe(res => {
        console.log('Res: ', res);
        localStorage.setItem('my_equipment', JSON.stringify(data));
        this.loadAll();
      });
  }

}