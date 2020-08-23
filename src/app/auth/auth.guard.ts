import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot }  from '@angular/router'
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
      
    constructor(private authService:AuthService,
        private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

         const isAuth=this.authService.getAuth()
        console.log(isAuth)
        if(!isAuth){
            this.router.navigate(['/signin'])
        }
        return true
        
    } 

}