import { Surburb } from './../_models/surburb';
import { Country } from './../_models/country';
import { City } from './../_models/city';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';


import { EmployeeService, AlertService } from '../_services';

import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegisterEmployee } from '../_models/registerEmployeeDTO';
import { Router } from '@angular/router';
// import { format } from 'path';


@Component({
  templateUrl: 'register_employee.component.html',
  styleUrls: ['./ss_administrator.component.css']
})
export class Register_EmployeeComponent implements OnInit {

  employee: any = {};
  submitted = false;

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
    private _router: Router
  ) {
  }

  // add the following code and bind to the front end the form name
  registerEmployeeForm = this.form.group({
    FirstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Title: new FormControl('', Validators.required),
    Gender: new FormControl('', Validators.required),
    idNumber: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    userRole: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    surburb: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    streetnumber: new FormControl('', Validators.required),
    streetname: new FormControl('', Validators.required),
    employeeJobTitle: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
  })

  // convenience getter for easy access to form fields
  get f() { return this.registerEmployeeForm.controls; }

  ngOnInit() {
    this.loadAll();
  }

  private loadAll() {

    this.employeeService.getAllCity()
      .pipe(first())
      .subscribe(
        city => {
          this.city = city;
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
    EmployeeCalendarId: undefined,
  };

  model: any = {};

  addEmployee() {

    this.submitted = true;

    this.model2.FirstName = this.registerEmployeeForm.get('FirstName')?.value;

    this.model2.MiddleName = this.registerEmployeeForm.get('middleName')?.value;

    this.model2.LastName = this.registerEmployeeForm.get('LastName')?.value;

    this.model2.Idnumber = this.registerEmployeeForm.get('idNumber')?.value;

    this.model2.DepartmentId = this.registerEmployeeForm.get('department')?.value;

    this.model2.UserRoleID = this.registerEmployeeForm.get('userRole')?.value;

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

    if (this.registerEmployeeForm.invalid) {
      this.alertService.error('Your Form is invalid');
      return;
    }
    else {
      this.employeeService.create(this.model2)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Registration was successful', true);
          },
          error => {
            this.alertService.error('Error, Registration was unsuccesful');
          });
    }
  }

}
