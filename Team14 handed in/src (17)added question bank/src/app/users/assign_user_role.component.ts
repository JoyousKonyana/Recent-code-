import { AuthenticationService } from './../_services/authentication.service';
import { AssignUserRole } from './../_models/assignuserrole';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Employee, User_Role } from '../_models';
import { EmployeeService, User_RoleService, AlertService } from '../_services';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({ 
    templateUrl: 'assign_user_role.component.html'
})
export class Assign_User_RoleComponent implements OnInit {

    user: any[] = [];
    user_role: any[] = [];
    //onboarder_equipment: AssignEquipment[] = [];

    selectedEmployee: any = {};
    selectedUser_Role: any = {};

    constructor(
        private user_roleService: User_RoleService,
        private employeeService: EmployeeService,
        private authenticationService: AuthenticationService,

       private alertService: AlertService,
       private form: FormBuilder,
   ) {
   }

   assiagnUserRoleForm = this.form.group({
    user_role: new FormControl('', Validators.required),
    user: new FormControl ('',Validators.required)
  })

   ngOnInit() { 
       this.loadAll();
   }

 private loadAll() {

   this.employeeService.getAllUser_Role()
     .pipe(first())
     .subscribe(
       user_role => {
        this.user_role = user_role;
        console.log(this.user_role);
       },
       error => {
         this.alertService.error('Error, Data (User Role) was unsuccesfully retrieved');
       } 
     );

     this.authenticationService.getAllUser()
      .pipe(first())
      .subscribe(
        user => {
          this.user = user;
          console.log(this.user);
         
        },
        error => {
          this.alertService.error('Error, Data (User) was unsuccesfully retrieved');
        } 
      );
   }

   model: any = {};

    model2: AssignUserRole = {
        User_ID: 1,
        UserRoleID: 1, 
   } ;

    assign() { 

     this.model2.User_ID = this.assiagnUserRoleForm.get('user')?.value;
     this.model2.UserRoleID = this.assiagnUserRoleForm.get('user_role')?.value;

   

     this.user_roleService.assign(this.model2)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Assign (User Role) was successful', true);
                },
                error => {
                    this.alertService.error('Error, Assign (User Role) was unsuccesful');
                });
   }
  
}