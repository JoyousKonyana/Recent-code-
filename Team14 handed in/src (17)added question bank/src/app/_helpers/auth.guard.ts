import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

    // canActivate() : boolean
    // {
    //     return true;
    // }

    constructor(private Authguardservice: AuthenticationService, private router: Router) {} 

    canActivate(): boolean {  
        if (!this.Authguardservice.gettoken()) {  
            this.router.navigateByUrl("/login");  
        }  
        return this.Authguardservice.gettoken();  
    } 

    // canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable<any>| Promise<any> | any{
    //      return  this.Authguardservice.isAuthenticated()
    //       .then((authenticated:any)=>{
    //         if(authenticated){
    //           return true;
    //         }
        //    else{
        //      this.router.navigate(['/']);
        //    }
        //  });
       //}


    
}