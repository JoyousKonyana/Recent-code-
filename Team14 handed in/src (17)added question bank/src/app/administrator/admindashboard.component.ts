import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { EquipmentService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'admindashboard.component.html',
    styleUrls: ['./admindashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    constructor(
    ) {
    }

    ngOnInit() {
    }
}