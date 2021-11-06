import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  loading = false;
  user: any;
  // userFromApi: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    //this.user = this.authenticationService.userValue;
  }

  model: any;



  ngOnInit() {
    this.model = localStorage.getItem('user');

    // this.loading = true;
    this.authenticationService.getUserById(this.model).pipe(first()).subscribe(user => {
      this.user = user;
    });

  }
}
