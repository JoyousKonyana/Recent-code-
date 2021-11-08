import { Equipment_QueryService } from './../_services/equipment_query.service';
import { Query_Status } from './../_models/query_status';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Course } from '../_models';
import { CourseService, AlertService } from '../_services';

import { Router } from '@angular/router';
import { ModalService } from '../_modal';

@Component({
  templateUrl: 'query.component.html',
  styleUrls: ['./ss_equipment.component.css']
})

export class QueryComponent implements OnInit {
  query: any;

  searchText = '';
  item: any;
  date!: string;
  myValue = 0;

  newQuery_StatusClicked = false;

  model: any = {};
  model2: any = {};

  model3: Query_Status = {
      EquipmentQueryStatusId: 0,
      EquipmentQueryDescription: ''
  };

  constructor(
    private queryService: Equipment_QueryService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadAll();
    this.date = new Date().toISOString().slice(0, 10);
  }

  private loadAll() {
    this.queryService.getAllQueryStatus()
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

  addQuery_Status() {
    if (Object.keys(this.model).length < 1) {
      this.alertService.error("Error, you have an empty feild");
      this.newQuery_StatusClicked = !this.newQuery_StatusClicked;
      this.model = {};
    }
    else if ((Object.keys(this.model).length == 1)) {
      this.model3.EquipmentQueryDescription = this.model.EquipmentQueryDescription;

      this.queryService.createQueryStatus(this.model3)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Creation was successful', true);
            this.loadAll();
            this.newQuery_StatusClicked = !this.newQuery_StatusClicked;
            this.model = {};
          },
          error => {
            this.alertService.error('Error, Creation was unsuccesful');
          });
    }
  }

  deleteQuery_Status(i: number) {
    this.queryService.deleteQueryStatus(i)
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

  editQuery_Status(editQuery_StatusInfo: number) {
    this.model2.EquipmentQueryDescription = this.query[editQuery_StatusInfo].equipmentQueryDescription;
    this.myValue = editQuery_StatusInfo;
  }

  updateQuery_Status() {
    let editQuery_StatusInfo = this.myValue;

    for (let i = 0; i < this.query.length; i++) {

      if (i == editQuery_StatusInfo) {
        this.model3.EquipmentQueryDescription = this.model2.EquipmentQueryDescription;

        this.queryService.updateQueryStatus(this.query[editQuery_StatusInfo].equipmentQueryStatusId , this.model3)
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

  addNewQuery_StatusBtn() {
    this.newQuery_StatusClicked = !this.newQuery_StatusClicked;
  }

}
