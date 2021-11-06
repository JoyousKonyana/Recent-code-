import { Component, OnInit, OnDestroy, Query } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Equipment, Equipment_Brand, Equipment_Query, Equipment_Type } from '../_models';
import { EquipmentService, AlertService } from '../_services';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({ 
    templateUrl: 'equipment.component.html',
    styleUrls: ['./ss_equipment.component.css'] 
})

export class EquipmentComponent implements OnInit {
    equipment: any[] = [];
    types: any[] = [];
    brands: any[] = [];

    searchText = '';

    date!: string;

    constructor(
      private equipmentService: EquipmentService,
      private alertService: AlertService,

      private form: FormBuilder,
    ) {
    }

    registerEquipmentForm = this.form.group({
        equipment_type: new FormControl('', Validators.required),
        equipment_brand: new FormControl ('',Validators.required),
        EquipmentTradeInDeadline: new FormControl('',Validators.required),
        EquipmentSerialNumber: new FormControl('', Validators.required),
      });

      updateEquipmentForm = this.form.group({
        equipment_type: new FormControl('', Validators.required),
        equipment_brand: new FormControl ('',Validators.required),
      })

    ngOnInit() { 
      this.loadAll();

      this.date = new Date().toISOString().slice(0, 10);
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

    this.equipmentService.getAllEquipment_Brand()
    .pipe(first())
    .subscribe(
      brands => {
        this.brands = brands;
        console.log(this.brands)
      },
      error => {
        this.alertService.error('Error, Data (Equipment Brand) was unsuccesfully retrieved');
      } 
    );

    this.equipmentService.getAllEquipment_Type()
    .pipe(first())
    .subscribe(
      types => {
        this.types = types;
      },
      error => {
        this.alertService.error('Error, Data (Equipment Type) was unsuccesfully retrieved');
      } 
    );

  }

    newEquipmentClicked = false;

    updateEquipmentClicked = false;

    newReport_QueryClicked = false;

  model: any = {};
  model2: any = {};

  model3:Equipment = {
    EquipmentId: 1,
    EquipmentTypeId: 1,
    EquipmentTradeInStatusId: 1,
    EquipmentTradeInDeadline: '',
    EquipmentBrandId: 1,
    EquipmentSerialNumber: '1',
    WarrantyId: 1
  };

  testData(){
    this.equipment.push(
      {
        equipmentId: 1, 
        equipmentTypeId: 1, 
        equipmentTradeInStatusId: 1, 
        warrantyStartDate: '',
        warrantyEndDate: '',
        warrantyStatus: '',
        equipmentTradeInDeadline: '', 
        equipmentBrandId: 1,
        equipmentSerialNumber : 54651,
      },
      {
        equipmentId: 2, 
        equipmentTypeId: 1, 
        equipmentTradeInStatusId: 1, 
        warrantyStartDate: '',
        warrantyEndDate: '',
        warrantyStatus: '',
        equipmentTradeInDeadline: '', 
        equipmentBrandId: 1,
        equipmentSerialNumber : 541,
      }
    );
  }


  addEquipment() {
    
    this.model3.EquipmentTypeId = this.registerEquipmentForm.get('equipment_type')?.value;
    this.model3.EquipmentTradeInDeadline = this.registerEquipmentForm.get('EquipmentTradeInDeadline')?.value;
    this.model3.EquipmentBrandId = this.registerEquipmentForm.get('equipment_brand')?.value;
    this.model3.EquipmentSerialNumber = String(this.registerEquipmentForm.get('EquipmentSerialNumber')?.value);

    this.equipmentService.create(this.model3)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Equipment was successfully Registered', true);
                    this.loadAll();
                    this.newEquipmentClicked = !this.newEquipmentClicked;
                },
                error => {
                  this.alertService.error('Error, Creation was unsuccesful');
                  this.loadAll();
              });
  }

  myValue = 0;

  deleteEquipment(i: number) {
    this.equipmentService.delete(i)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Deletion of Equipment was successful', true);
                    this.loadAll();
                },
                error => {
                    this.alertService.error('Error, Deletion was unsuccesful');
                });
  }

  editEquipment(editEquipmentInfo: number) {
    this.updateEquipmentClicked = !this.updateEquipmentClicked;

    this.model2.EquipmentTradeInStatus = this.equipment[editEquipmentInfo].equipmentTradeInStatus;
    this.model2.EquipmentTradeInDeadline = this.equipment[editEquipmentInfo].equipmentTradeInDeadline;
    this.model2.EquipmentSerialNumber = this.equipment[editEquipmentInfo].equipmentSerialNumber;

    this.myValue = editEquipmentInfo;
  }

  editReport_Query(editReport_QueryInfo: number) {
    this.newReport_QueryClicked = !this.newReport_QueryClicked;

    // this.model2.status = this.equipment[editReport_QueryInfo].equipment_query_status;
    // this.model2.description = this.equipment[editReport_QueryInfo].equipment_query_description;
    this.myValue = editReport_QueryInfo;
  }

  updateEquipment() {
    let editEquipmentInfo = this.myValue;

    this.model3.EquipmentTypeId = this.updateEquipmentForm.get('equipment_type')?.value;
    this.model3.EquipmentTradeInDeadline = this.model2.EquipmentTradeInDeadline;
    this.model3.EquipmentBrandId = this.updateEquipmentForm.get('equipment_brand')?.value;
    this.model3.EquipmentSerialNumber = String(this.model2.EquipmentSerialNumber);

    for(let i = 0; i < this.equipment.length; i++) {

      if(i == editEquipmentInfo) 
      {
        this.equipmentService.update(this.equipment[editEquipmentInfo].equipmentId, this.model3)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update was successful', true);
                    this.loadAll();
                    this.model2 = {};
                },
                error => {
                    this.alertService.error('Error, Update was unsuccesful');
                });
      }
    }
  }

  model4: Equipment_Query = {
    EquipmentId: 1,
    OnboarderId: 1,
    EquipmentQueryDescription: '',
    EquipmentQueryDate: ''
  }

  updateReport_Query() {
    let editReport_QueryInfo = this.myValue;
    for(let i = 0; i < this.equipment.length; i++) {
      if(i == editReport_QueryInfo) {
        this.model4.EquipmentId = this.equipment[editReport_QueryInfo].equipmentId;
        
        this.equipmentService.ReportEquipmentQuery(this.model4)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update Query was successful', true);
                    this.loadAll();
                    this.model2 = {};
                },
                error => {
                    this.alertService.error('Error, Update was unsuccesful');
                });
      }
    }

    this.newReport_QueryClicked = !this.newReport_QueryClicked;
  }

  addNewEquipmentBtn() {
        this.newEquipmentClicked = !this.newEquipmentClicked;
  }

  CloseReport_QueryBtn(){
      this.newReport_QueryClicked = !this.newReport_QueryClicked;
  }
  
}