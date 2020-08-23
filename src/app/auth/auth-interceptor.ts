import { HttpInterceptor, HttpRequest, HttpHandler }  from '@angular/common/http'
import { Injectable, OnDestroy } from '@angular/core'
import { AuthService } from './auth.service'
import { Subscription } from 'rxjs'


@Injectable()
export class AuthInterceptor implements HttpInterceptor ,OnDestroy{

    constructor(private authservice:AuthService){}
    authToken:string
    authTokenSubs:Subscription
    intercept(req:HttpRequest<any>,next:HttpHandler){

         this.authTokenSubs=this.authservice.getToken().subscribe(token=>{
                  this.authToken=token
         })
  
        const AuthRequest=req.clone({
            headers:req.headers.set('Authorization',"Bearer "+this.authToken)
        })
        return next.handle(AuthRequest) 
    }

    ngOnDestroy(){
          this.authTokenSubs.unsubscribe()
    }
    
}