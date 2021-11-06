import { AssignUserRole } from './../_models/assignuserrole';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';

import {User_Role} from '../_models';

@Injectable({
  providedIn: 'root'
})

export class User_RoleService {

   //Joyous, please put the link of the API here
   url = 'https://localhost:44319/api/UserRole'; 
   userId: any = localStorage.getItem('user'); 

  constructor(private http: HttpClient) { }  

  getAllUser_Role(): Observable<any[]> {  
    return this.http.get<any[]>(`${this.url}/GetAllUserRoles`);  
  }  

  getUser_RoleById(id: number): Observable<any> {  
      return this.http.get<any>(`${this.url + '/GetUserRoleByNamebyid/' + id}`);  
    }  

  delete(id: number) {
    return this.http.delete(`${this.url}/DeleteUserRole/` + id + '/' + this.userId);
  }

  update(id: number, user_role:User_Role) {
    return this.http.put(`${this.url}/UpdateUserRole/`+ id + '/' + this.userId, user_role);
  }

  create(user_role: User_Role) {
    return this.http.post(`${this.url}/CreateUserRole/` + this.userId, user_role);
  }

  assign(user_role: AssignUserRole) {
    return this.http.put(`${this.url}/AssignedUserRole`, user_role);
  }

} 