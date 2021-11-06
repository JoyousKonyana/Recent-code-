import { AuthenticationService } from './_services';
import { User, Role } from './_models';
import { ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User_Role } from './_models';
import { User_RoleService, EmployeeService, AlertService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //Pages and their boolean
  users: boolean = false;
  administrator: boolean = false;
  equipment: boolean = false;
  course: boolean = false;
  onboarder: boolean = false;
  report: boolean = false;

  title = 'bmw-onboarder-front';

  public sidebarShow: boolean = false;

  session = '2';

  user: any;

  user_role: any = {};

  //Array to read user role description
  role: any = {};

  //Hold string to later store it into array
  dataHolder!: string;

  model: any;
  model2: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,

    private employeeService: EmployeeService,
    private user_roleService: User_RoleService
  ) {
    //this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.model = localStorage.getItem('user');

    this.authenticationService.getUserById(this.model)
      .pipe(first())
      .subscribe(user => {
        this.user = user;
        this.findUserRole();
      });

  }

  findUserRole() {
    this.dataHolder = this.user.userRole.userRoleName;
    this.role = this.dataHolder.split(" ");//This split string to an array when system detects space

    for (let i = 0; i < this.role.length; i++) {
      if (this.role[i] == "users" || this.role[i] == "Users") {
        this.users = true;
      }
      if (this.role[i] == "administrator" || this.role[i] == "Administrator") {
        this.administrator = true;
      }
      if (this.role[i] == "equipment" || this.role[i] == "Equipment") {
        this.equipment = true;
      }
      if (this.role[i] == "onboarder" || this.role[i] == "Onboarder") {
        this.onboarder = true;
      }
      if (this.role[i] == "course" || this.role[i] == "Course") {
        this.course = true;
      }
      if (this.role[i] == "report" || this.role[i] == "Report") {
        this.report = true;
      }
    }
  }

  //Block features according to user role
  get isUsers() {
    return this.users == true ? true : false;
  }
  get isAdministraor() {
    return this.administrator == true ? true : false;
  }
  get isEquipment() {
    return this.equipment == true ? true : false;
  }
  get isCourse() {
    return this.course == true ? true : false;
  }
  get isOnboarder() {
    return this.onboarder == true ? true : false;
  }
  get isReport() {
    return this.report == true ? true : false;
  }

  logout() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    localStorage.removeItem('SeesionUser');
    localStorage.removeItem('user');
    this.router.navigateByUrl(returnUrl);
  }
}
