import { Title } from './../_models/title';
import { Surburb } from './../_models/surburb';
import { Country } from './../_models/country';
import { Province } from './../_models/province';
import { Gender } from './../_models/gender';
import { User_Role } from './../_models/user_role';
import { City } from './../_models/city';

import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Reg_Emp, Employee, Department } from '../_models';
import { EmployeeService, AlertService } from '../_services';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegisterEmployee } from '../_models/registerEmployeeDTO';

@Component({ 
    templateUrl: 'profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
    employee: any = {};

  city: City[] = [];
  province: any[] = [];
  country: Country[] = [];
  suburb: Surburb[] = [];
  user_role: any[] = [];
  department: any[] = [];
  gender: any[] = [];
  title: any[] = [];

  constructor(
      
      private alertService: AlertService,
      private employeeService: EmployeeService,
      //add this
      private form: FormBuilder,
  ) {
  }

  // add the following code and bind to the front end the form name
  registerEmployeeForm = this.form.group({
    FirstName: new FormControl('', Validators.required), //Done
    middleName: new FormControl ('',Validators.required), //Done
    LastName: new FormControl('',Validators.required), //Done
    Title: new FormControl('', Validators.required), //Done
    Gender: new FormControl('', Validators.required), //Done
    //idNumber: new FormControl('', Validators.required), //Done Disabled
    contactNumber:new FormControl('', Validators.required), //Done
    //department: new FormControl('', Validators.required), //Done Disabled
    //userRole:new FormControl('', Validators.required), //Done Disabled
    province:new FormControl('', Validators.required), //Done
    surburb:new FormControl('', Validators.required), //Done
    city:new FormControl('', Validators.required), //Done
    country:new FormControl('', Validators.required), //Done
    streetnumber:new FormControl('', Validators.required), //Done
    streetname:new FormControl('', Validators.required), //Done
    email:new FormControl('', Validators.required), //Done
    employeeJobTitle:new FormControl('', Validators.required),
  })

  ngOnInit() { 
    this.loadAll();

}

private loadAll() {

  this.employeeService.getEmployeeById(1)
  .pipe(first())
  .subscribe(
    employee => {
      this.employee = employee;

      this.model.FirstName = this.employee.firstName;
      this.model.middleName = this.employee.middleName;
      this.model.lastName = this.employee.lastName;
      this.model.email = this.employee.emailAddress;
      this.model.idNumber = this.employee.idnumber;
      this.model.contactNumber = this.employee.contactNumber;
      this.model.jobTitle = this.employee.employeeJobTitle;
      this.model.streetnumber = this.employee.streetNumber;
      this.model.streetname = this.employee.streetName;

    },
    error => {
      this.alertService.error('Error, Data (City) was unsuccesfully retrieved');
    } 
  );

  this.employeeService.getAllCity()
  .pipe(first())
  .subscribe(
    city => {
      this.city = city;
      console.log(city);
    },
    error => {
      this.alertService.error('Error, Data (City) was unsuccesfully retrieved');
    } 
  );

  this.employeeService.getAllCountry()
  .pipe(first())
  .subscribe(
    country => {
      this.country = country;
      console.log(this.country);
    },
    error => {
      this.alertService.error('Error, Data (Country) was unsuccesfully retrieved');
    } 
  );

  this.employeeService.getAllTitle()
  .pipe(first())
  .subscribe(
    title => {
      this.title = title;
      console.log(this.title);
    },
    error => {
      this.alertService.error('Error, Data (Title) was unsuccesfully retrieved');
    } 
  );

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

  this.employeeService.getAllDepartment()
  .pipe(first())
  .subscribe(
    department => {
      this.department = department;
      console.log(this.department);
    },
    error => {
      this.alertService.error('Error, Data (Department) was unsuccesfully retrieved');
    } 
  );

  this.employeeService.getAllSuburbs()
  .pipe(first())
  .subscribe(
    suburb => {
      this.suburb = suburb;
      console.log(this.suburb);
    },
    error => {
      this.alertService.error('Error, Data (Surburbs) was unsuccesfully retrieved');
    } 
  );

  this.employeeService.getAllGender()
  .pipe(first())
  .subscribe(
    gender => {
      this.gender = gender;
      console.log(this.gender);
    },
    error => {
      this.alertService.error('Error, Data (Gender) was unsuccesfully retrieved');
    } 
  );

  this.employeeService.getAllProvince()
  .pipe(first())
  .subscribe(
    province => {
      this.province = province;
      console.log(this.province);
    },
    error => {
      this.alertService.error('Error, Data (Province) was unsuccesfully retrieved');
    } 
  );
}

  model2: RegisterEmployee = {
    EmployeeId: 1,
    DepartmentId: 1,
    UserRoleID: 1,
    GenderId: 1,
    FirstName: 'string',
    LastName: 'string',
    MiddleName: 'string',
    Idnumber: 1,
    EmailAddress: 'string',
    ContactNumber: 1,
    TitleId: 1,
    SuburbId: 1,
    ProvinceId: 1,
    CityId: 1,
    CountryId: 1,
    StreetNumber: 1,
    StreetName: 'string',
    EmployeeJobTitle: '',
    AddressId: undefined,
    EmployeeCalendarId: undefined
  };
  
  model: any = {};

 addEmployee() { 
    this.model2.FirstName = this.registerEmployeeForm.get('FirstName')?.value;
    this.model2.MiddleName = this.registerEmployeeForm.get('middleName')?.value;
    this.model2.LastName = this.registerEmployeeForm.get('LastName')?.value;
    this.model2.Idnumber = this.employee.idnumber;
    this.model2.DepartmentId = this.employee.departmentId;
    this.model2.UserRoleID = this.employee.userRoleID;
    this.model2.TitleId = this.registerEmployeeForm.get('Title')?.value;
    this.model2.StreetNumber = this.registerEmployeeForm.get('streetnumber')?.value;
    this.model2.StreetName = this.registerEmployeeForm.get('streetname')?.value;
    this.model2.GenderId = this.registerEmployeeForm.get('Gender')?.value;
    this.model2.ProvinceId = this.registerEmployeeForm.get('province')?.value;
    this.model2.SuburbId = this.registerEmployeeForm.get('surburb')?.value;
    this.model2.CountryId = this.registerEmployeeForm.get('country')?.value;
    this.model2.CityId = this.registerEmployeeForm.get('city')?.value;
    this.model2.ContactNumber = this.registerEmployeeForm.get('contactNumber')?.value;
    this.model2.EmailAddress = this.registerEmployeeForm.get('email')?.value;
    this.model2.EmployeeJobTitle = this.registerEmployeeForm.get('employeeJobTitle')?.value;

    this.employeeService.update(1, this.model2)
    .pipe(first())
    .subscribe(
        data => {
            this.alertService.success('Profile update was successful', true);
       },
        error => {
            this.alertService.error('Error, Profile update was unsuccesful');
       });
   }
}