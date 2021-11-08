import { Equipment_Type } from './../_models/equipment_type';
import { EquipmentService } from './../_services/equipment.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Course } from '../_models';
import { CourseService, AlertService } from '../_services';

import { Router } from '@angular/router';
import { ModalService } from '../_modal';

@Component({
  templateUrl: 'equipment_type.component.html',
  styleUrls: ['./ss_equipment.component.css']
})

export class Equipment_TypeComponent implements OnInit {
  equipment_type: any;

  searchText = '';
  item: any;
  date!: string;
  myValue = 0;

  newEquipment_TypeClicked = false;

  model: any = {};
  model2: any = {};

  model3: Equipment_Type = {
      EquipmentTypeId: 0,
      EquipmentTypeDescription: ''
  };

  constructor(
    private equipmentService: EquipmentService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadAll();
    this.date = new Date().toISOString().slice(0, 10);
  }

  private loadAll() {
    this.equipmentService.getAllEquipment_Type()
      .pipe(first())
      .subscribe(
        equipment_type => {
          this.equipment_type = equipment_type;
        },
        error => {
          this.alertService.error('Error, Data was unsuccesfully retrieved');
        }
      );
  }

  addEquipment_Type() {
    if (Object.keys(this.model).length < 1) {
      this.alertService.error("Error, you have an empty feild");
      this.newEquipment_TypeClicked = !this.newEquipment_TypeClicked;
      this.model = {};
    }
    else if ((Object.keys(this.model).length == 1)) {
      this.model3.EquipmentTypeDescription = this.model.EquipmentTypeDescription;

      this.equipmentService.createType(this.model3)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Creation was successful', true);
            this.loadAll();
            this.newEquipment_TypeClicked = !this.newEquipment_TypeClicked;
            this.model = {};
          },
          error => {
            this.alertService.error('Error, Creation was unsuccesful');
          });
    }
  }

  deleteEquipment_Type(i: number) {
    this.equipmentService.deleteType(i)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Deletion was successful', true);
          this.loadAll();
        },
        error => {
          this.alertService.error('Error, Deletion was unsuccesful');
        });
  }

  editEquipment_Type(editEquipment_TypeInfo: number) {
    this.model2.CourseDescription = this.equipment_type[editEquipment_TypeInfo].courseDescription;
    this.myValue = editEquipment_TypeInfo;
  }

  updateEquipment_Type() {
    let editEquipment_TypeInfo = this.myValue;

    for (let i = 0; i < this.equipment_type.length; i++) {

      if (i == editEquipment_TypeInfo) {
        this.model3.EquipmentTypeDescription = this.model2.EquipmentTypeDescription;

        this.equipmentService.updateType(this.equipment_type[editEquipment_TypeInfo].EquipmentTypeId, this.model3)
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

  addNewCourseBtn() {
    this.newEquipment_TypeClicked = !this.newEquipment_TypeClicked;
  }

  onNavigateToCourseLessons(course:any){
    this.router.navigate(['/lesson',course.courseID])
  }

}
