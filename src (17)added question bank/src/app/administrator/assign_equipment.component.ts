import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Onboarder, Equipment, AssignEquipment, Onboarder_Equipment } from '../_models';
import { OnboarderService, EquipmentService, AlertService } from '../_services';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({ 
    templateUrl: 'assign_equipment.component.html',
    styleUrls: ['./ss_administrator.component.css'] 
})

export class Assign_EquipmentComponent implements OnInit {

  equipment: any[] = [];
  onboarder: any[] = [];
  onboarder_equipment: AssignEquipment[] = [];

  date!: string;

  constructor(
      private onboarderService: OnboarderService,
      private equipmentService: EquipmentService,

      private alertService: AlertService,
      private form: FormBuilder,
  ) {
  }

  assignEquipmentForm = this.form.group({
    equipment: new FormControl('', Validators.required),
    onboarder: new FormControl ('',Validators.required),
    checkout: new FormControl('',Validators.required),
    condition: new FormControl('', Validators.required),
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
        console.log(this.equipment);
      },
      error => {
        this.alertService.error('Error, Data (Equipment) was unsuccesfully retrieved');
      } 
    );

    this.onboarderService.getAllOnboarder()
    .pipe(first())
    .subscribe(
      onboarder => {
        this.onboarder = onboarder;
        console.log(this.onboarder);
      },
      error => {
        this.alertService.error('Error, Data (Onboarder) was unsuccesfully retrieved');
      } 
    );
  }

  selectedEquipment: any = {};
  selectedOnboarder: any = {};

  model3:AssignEquipment = {
    EquipmentId: 1,
    OnboarderId: 1, 
    EquipmentCheckOutDate:new Date(),  
    EquipmentCheckOutCondition: '2018-01-03', 
    EquipmentCheckInCondition: '2018-01-03',
    EquipmentCheckInDate:new Date()
  };

  addOnboarder_Equipment() { 

    this.model3.EquipmentId = this.assignEquipmentForm.get('equipment')?.value;
    this.model3.OnboarderId = this.assignEquipmentForm.get('onboarder')?.value;
    this.model3.EquipmentCheckOutDate = this.assignEquipmentForm.get('checkout')?.value;
    this.model3.EquipmentCheckOutCondition = this.assignEquipmentForm.get('condition')?.value;

    this.equipmentService.AssignEquipment(this.model3)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Assign was successful', true);
                },
                error => {
                    this.alertService.error('Error, Assign was unsuccesful');
                });
  }

}