import { AssignCourse } from './../_models/assigncourse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Active_LogService {

   //Joyous, please put the link of the API here
   url = 'https://localhost:44319/api/ActiveLog';  

  constructor(private http: HttpClient) { }  

  getAllActive_Log(): Observable<any> {  
    return this.http.get<any>(`${this.url}/GenerateAuditReport/`);  
  }  

} 