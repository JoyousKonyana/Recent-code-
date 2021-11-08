import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Achievment_Type, Badge } from '../_models';
import { Achievment_TypeService, AlertService } from '../_services';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({ 
    templateUrl: 'crud_achievement.component.html',
    styleUrls: ['./ss_course.component.css'] 
})

export class CRUD_AchievementComponent implements OnInit {
  achievment_type: any[] = [];
  badge: any[] = [];

  searchText = '';

  constructor(
      private achievment_typeService: Achievment_TypeService,
      private alertService: AlertService,
      private form: FormBuilder,
  ) {

  }

  createForm = this.form.group({
    badge: new FormControl('', Validators.required),
    description: new FormControl ('',Validators.required),
  })

    updateForm  = this.form.group({
        badge: new FormControl('', Validators.required),
        description: new FormControl ('',Validators.required),
    })

  ngOnInit() { 
      this.loadAll();
  }

  private loadAll() {

    this.achievment_typeService.getAllAchievment_Type()
    .pipe(first())
    .subscribe(
      achievment_type => {
        this.achievment_type = achievment_type;
      },
      error => {
        this.alertService.error('Error, Data was unsuccesfully retrieved');
      } 
    );

    this.achievment_typeService.getAllBadges()
    .pipe(first())
    .subscribe(
      badge => {
        this.badge = badge;
      },
      error => {
        this.alertService.error('Error, Data was unsuccesfully retrieved');
      } 
    );
  }

    newAchievement_TypeClicked = false;
    updateAchievement_TypeClicked = false;

  model: any = {};
  model2: any = {};

    model3: Achievment_Type ={
      AchievementTypeId:1,
      AchievementTypeDescription:"",
      BadgeId:1
      
    }

  addAchievement_Type() { 
    this.model3.BadgeId =  this.createForm.get('badge')?.value;
    this.model3.AchievementTypeDescription =  this.createForm.get('description')?.value;

    this.achievment_typeService.create(this.model3)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Creation was successful', true);
                    this.loadAll();
                    this.newAchievement_TypeClicked = !this.newAchievement_TypeClicked;
                },
                error => {
                    this.alertService.error('Error, Creation was unsuccesful');
                });
  }

  deleteAchievment_Type(i: number) {
    this.achievment_typeService.delete(i)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Deletion was successful', true);
                    this.achievment_type.splice(i, 1);
                },
                error => {
                    this.alertService.error('Error, Deletion was unsuccesful');
                });
  }

  myValue = 0;

  editAchievment_Type(editAchievment_TypeInfo: number) {
    this.myValue = editAchievment_TypeInfo;

    this.updateAchievement_TypeClicked =!this.updateAchievement_TypeClicked;
  }

  updateAchievement_Type() {
    let editAchievment_TypeInfo = this.myValue;

    for(let i = 0; i < this.achievment_type.length; i++) {

      if(i == editAchievment_TypeInfo) 
      {
        this.model3.BadgeId =  this.updateForm.get('badge')?.value;
        this.model3.AchievementTypeDescription =  this.updateForm.get('description')?.value;

        this.achievment_typeService.update(this.achievment_type[editAchievment_TypeInfo].achievementTypeId, this.model3)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update was successful', true);
                    this.loadAll();
                    this.updateAchievement_TypeClicked =!this.updateAchievement_TypeClicked;
                },
                error => {
                    this.alertService.error('Error, Update was unsuccesful');
                    this.updateAchievement_TypeClicked =!this.updateAchievement_TypeClicked;
                });
      }
    }
    }

    addNewAchievement_TypeBtn() {
      this.newAchievement_TypeClicked = !this.newAchievement_TypeClicked;
      }

}