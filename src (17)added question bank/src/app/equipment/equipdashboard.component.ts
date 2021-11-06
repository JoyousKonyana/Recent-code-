import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { EquipmentService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'equipdashboard.component.html',
    styleUrls: ['./equipdashboard.component.css']
})
export class EquipDashboardComponent implements OnInit {

    constructor(
    ) {
    }

    ngOnInit() {
    }
}