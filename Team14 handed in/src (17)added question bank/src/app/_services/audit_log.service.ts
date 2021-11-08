import { Audit_Log } from './../_models/audit_log';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';

import * as _models from '../_models';

@Injectable({
  providedIn: 'root'
})
export class Audit_LogService {

   //Joyous, please put the link of the API here
   url = 'https://localhost:44319/api/AuditLog';  

  constructor(private http: HttpClient) { }  

  getAllAudit_Log(): Observable<any> {  
    return this.http.get<any>(`${this.url}/GetAllAuditLog/`);  
  }  

} 