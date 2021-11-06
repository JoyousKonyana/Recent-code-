import { ProgressReport } from './../_models/progressreport';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';

import {Onboarder} from '../_models';

@Injectable({
  providedIn: 'root'
})
export class OnboarderService {

   //Joyous, please put the link of the API here
   url = 'https://localhost:44319/api/Onboarder';  

  constructor(private http: HttpClient) { }  

  getAllOnboarder(): Observable<any[]> {  
    return this.http.get<any[]>(`${this.url}/GetAllOnboarders`);  
  }

  getOnboarderById(id: string): Observable<Onboarder> {  
      return this.http.get<Onboarder>(`${this.url + '/GetOnboarderById/' + id}`);  
    }  

  delete(id: number) {
    return this.http.delete(`${this.url + '/DeleteOnboarder/' + id}`);
  }

  update(id: number, onboarder: object) {
    return this.http.put(`${this.url + '/UpdateOnboarder/' + id}`, onboarder);
  }

  generateCourseProgressReport(onboarderprogressreport: ProgressReport) {
    return this.http.post(`${this.url + '/GenerateCourseProgressReport'}`, onboarderprogressreport);
  }

  create(onboarder: object) {
    return this.http.post(`${this.url + '/CreateOnboarder/'}`, onboarder);
  }

} 