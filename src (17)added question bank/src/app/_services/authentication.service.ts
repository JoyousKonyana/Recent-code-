//import { AuthenticationService } from '../_services';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForgotPassWord, Login, OTP, User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private userSubject!: BehaviorSubject<User>;
    public user!: Observable<User>;

    url = 'https://localhost:44319/api/User'; 
    httHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        // this.user = this.userSubject.asObservable();
    }

    getUserById(id: number): Observable<any> {  
        return this.http.get<any>(`${this.url}/getUserById/`+ id);  
      } 

    gettoken(){  
        return !!localStorage.getItem("SeesionUser");  
    }

    getuser(){  
        return !!localStorage.getItem("user");  
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    getAllUser(): Observable<any>{
        return this.http.get<any>(`${this.url}/getAllUsers`);
      }

    login(loginInfo:Login) {
        return this.http.post<any>(`${this.url}/Login2`, loginInfo)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('user', user);
            }));
    }

    // forgotpassword(userEmail:ForgotPassWord) {
    //     return this.http.post(`${this.url}/forgotPaaword`, 'konyanajoyous2',{headers:this.httHeaders})
    //         .pipe(map(user => {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             //localStorage.setItem('user', JSON.stringify(user));
    //             // localStorage.setItem('user', user);
    //         }));
    // }

    forgotpassword(usermail:ForgotPassWord){

        console.log(usermail.Username);
        return this.http.post(`${this.url}/ForgotPassword`,usermail.Username);
    }

    otp(otp: OTP) {
        return this.http.post<any>(`${this.url}/twofatorAuth`, otp).pipe(map(role => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('userrole', role);
            // this.userSubject.next(user);
            // return user;
          
        }));
};
    
}