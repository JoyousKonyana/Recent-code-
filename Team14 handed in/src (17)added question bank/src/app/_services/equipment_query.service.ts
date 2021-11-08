import { Query_Status } from './../_models/query_status';
import { ResolveQuery } from './../_models/resolvequery';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';

import {Equipment_Query} from '../_models';
import { EquipmentQuery } from '../_models/equipmentquery';

@Injectable({
  providedIn: 'root'
})
export class Equipment_QueryService {

   //Joyous, please put the link of the API here
   url = 'https://localhost:44319/api/EquipmentQuery';  
  //  header= new HttpHeaders(){
  //   // Content-Type: "application/json"
  //  };

  userId: any = localStorage.getItem('user');

  httHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }  

  getAllEquipment_Query(): Observable<any> {  
    return this.http.get<any>(`${this.url}/GetAllEqipmentQueries`);  
  }  

  getEquipment_QueryById(id: number): Observable<Equipment_Query> {  
      return this.http.get<Equipment_Query>(`${this.url}/GetQuerybyid/` +id);  
    }

  create(x:Equipment_Query) {
    return this.http.post(`${this.url}/ReportEquipmentQuery`, x);
  }

  url2 = 'https://localhost:44319/api/EquipmentQueryStatus'; 
  //Status
  createQueryStatus(x:Query_Status) {
    return this.http.post(`${this.url2}/CreateQueryStatus/` + this.userId, x);
  }
  getAllQueryStatus(): Observable<any> {
    return this.http.get<any>(`${this.url2}/GetAllQueryStatuses`);
  }
  deleteQueryStatus(id: number) {
    return this.http.delete(`${this.url2}/DeleteQueryStatus/` + id + '/' + this.userId);
  }
  updateQueryStatus(id: number, query_status: Query_Status) {
    return this.http.put(`${this.url2}/UpdateQueryStatus/` + id + '/' + this.userId, query_status);
  }

  resolveQuery(resolve: ResolveQuery){
    return this.http.put(`${this.url}/ResolveQuery`, resolve);
  }

  url3 = 'https://localhost:44319/api/Equipment'; 
  checkEquipment(data) {
    return this.http.put(`${this.url3}/CheckEquipment/` + this.userId, data);
  }

} 