import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';

import {FAQ} from '../_models';

@Injectable({
  providedIn: 'root'
})
export class FAQService {

   //Joyous, please put the link of the API here
   url = 'https://localhost:44319/api/Faq';
   userId: any = localStorage.getItem('user');  
  //  header= new HttpHeaders(){
  //   // Content-Type: "application/json"
  //  };

  httHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }  

  getAllFAQ(): Observable<FAQ[]> {  
    return this.http.get<FAQ[]>(`${this.url}/GetAllFaq`);  
  }  

  getFAQById(id: string): Observable<FAQ> {  
      return this.http.get<FAQ>(`${this.url + '/GetFAQById/' + id}`);  
    }  

  delete(id: number) {
    return this.http.delete(`${this.url + '/DeleteFAQ/' + id + '/' + this.userId}`);
  }

  update(id: number, faq: object) {
    return this.http.put(`${this.url + '/UpdateFAQ/' + id + '/' + this.userId}`, faq);
  }

  create(faq:FAQ) {
    return this.http.post(`${this.url}/CreateFAQ` , faq, {headers:this.httHeaders});
  }

} 