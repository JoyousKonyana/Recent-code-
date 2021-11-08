import { Department } from './../_models/department';
import { User_Role } from './../_models/user_role';
import { RegisterEmployee } from './../_models/registerEmployeeDTO';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';

import {Reg_Emp, Employee, Title, Gender, Country, Surburb} from '../_models';
import { City } from '../_models/city';
import { Province } from '../_models/province';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

   //Joyous, please put the link of the API here
   url = 'https://localhost:44319/api/Employee';  

  constructor(private http: HttpClient) { }  

  //this return an object containing all the required information
  // before you can register
  getInformationToRegister(){
    return this.http.get<any>(`${this.url}/GetAll`);
  }
  
  getAllEmployee(): Observable<any> {  
    return this.http.get<any>(`${this.url}/GetAllEmployees/`);  
  }  

  getEmployeeById(id: number): Observable<Employee> {  
    return this.http.get<Employee>(`${this.url}/GetEmployeeById/`+ id);  
  }  

  delete(id: number) {
    return this.http.delete(`${this.url}/`+ id);
  }

  update(id: number, employee: RegisterEmployee) {
    return this.http.put(`${this.url}/UpdateEmployee/`+ id, employee);
  }

  create(reg_emp: RegisterEmployee) {
     return this.http.post(`${this.url}/RegisterEmployee`, reg_emp);
  }

  RegisterEmployeeFromImport(newEmployees:any[]){
    return this.http.post(`${this.url}/EmployeesFromImport`, newEmployees);
  }


  url2 = 'https://localhost:44319/api'; 

  getAllCity(): Observable<any>{
    return this.http.get<any>(`${this.url2}/City/GetAllCities`);
  }
  getAllCountry(): Observable<any>{
    return this.http.get<any>(`${this.url2}/Country/GetAllCountries`);
  }
  getAllTitle(): Observable<any>{
    return this.http.get<any>(`${this.url2}/Title/GetAllTitle`);
  }
  getAllUser_Role(): Observable<any>{
    return this.http.get<any>(`${this.url2}/UserRole/GetAllUserRoles`);
  }
  getAllDepartment(): Observable<any>{
    return this.http.get<any>(`${this.url2}/Department/GetAllDepartments`);
  }
  getAllSuburbs(): Observable<any>{
    return this.http.get<any>(`${this.url2}/Suburb/GetAllSuburbs`);
  }
  getAllGender(): Observable<any> {
    return this.http.get<any>(`${this.url2}/Gender/GetAllGenders`);
  }
  getAllProvince(): Observable<any> {
    return this.http.get<any>(`${this.url2}/Province/GetAllProvinces`);
  }
} 