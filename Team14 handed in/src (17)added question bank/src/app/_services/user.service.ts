import { OTP } from './../_models/otp';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    url = 'https://localhost:44319/api/User';

    getAll() {
        return this.http.get<User[]>(`${this.url}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${this.url}/users/${id}`);
    }

    getByEmail(email: any) {
        return this.http.get<any>(`${this.url}/GetUserByEmail/${email}`);
    }

    resetPassword(user:any) {
        return this.http.post(`${this.url}/setPaaword`, user);
      }

    //login = '';
}