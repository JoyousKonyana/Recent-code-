import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({ 
    templateUrl: 'view_booking.component.html',
    styleUrls: ['./ss_administrator.component.css'] 
})

export class View_BookingComponent implements OnInit {

    constructor(
    ) {
    }

    ngOnInit() {
        
    }

}