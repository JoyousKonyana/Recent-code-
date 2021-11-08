import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({ 
    templateUrl: 'about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent {
    loading = false;

    constructor(
    ) {
    }

    ngOnInit() {
    }
}