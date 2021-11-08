import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'admin.component.html', styleUrls: ['./role.component.css']  })

export class AdminComponent implements OnInit {
    loading = false;

    constructor() { }

    ngOnInit() {
    }
}