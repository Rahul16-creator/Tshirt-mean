import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

constructor(private http:HttpClient,private router:Router) { }
private token:string
private timer:any
private errorStatusListener=new Subject<string>()
private authStatusListener=new Subject<boolean>()
private isAuthenticated=false
private isrole=-1
private roleStatusListener=new Subject<number>()
private array=[]
private tokenStatusListener=new Subject<string>()

// public owner=new Subject<string>()
private owner:string


  signup(name:string,email:string,password:string){
    let post={
        name:name,
        email:email,
        password:password
    }
    this.http.post<{token:string,exp:number,role:number,name:string,email:string}>('http://localhost:3000/api/signup',post).subscribe((data)=>{
     
       this.router.navigate(["/signin"]);
       console.log(data)

    },error=>{
        console.log(error.error)
    })
}



signin(email:string,password:string){
    let data={
        email:email,
        password:password
    }

    this.http.post<{token:string,exp:number,role:number,name:string,email:string,owner:string,photo:string}>('http://localhost:3000/api/signin',data).subscribe(data=>{
       
      this.owner=data.owner

      
      this.token=data.token
      this.tokenStatusListener.next(data.token)
      const expiresInDuration = data.exp;
      this.setAuthTimer(expiresInDuration);
      this.authStatusListener.next(true);
      this.isAuthenticated=true
      const now = new Date();
      const expirationDate = new Date( now.getTime() + expiresInDuration * 1000);
      this.saveAuthData(data.token, expirationDate);
      this.isrole=data.role
      this.roleStatusListener.next(data.role)
      this.errorStatusListener.next(null)
      this.array.push(data.email,data.name,data.photo,data.owner)
      
        
        if(data.role==1){
          // this.isrole=1
           this.router.navigate(["/admin"]);
        }
        else {
          this.router.navigate(["/"]);
        }
        // this.isrole=0
    },error=>{
      console.log(error)
        this.errorStatusListener.next(error.error.message)
        
    })
}


getAdminDetails(){
  console.log(this.array)
  return this.array
}

getOwner(){
return this.owner
}


signout(){
    this.token=null
    this.authStatusListener.next(false)
    this.isAuthenticated=false
    clearTimeout(this.timer)
    this.clearAuthData();
    this.http.get('http://localhost:3000/api/signout').subscribe()
    this.router.navigate(['/'])
}


getToken(){
    return this.tokenStatusListener.asObservable()
}

getAuthStatusListener() {
    return this.authStatusListener.asObservable()
}

getAuth(){
return this.isAuthenticated
}

getRole(){
  return this.isrole
}

getRoleListernerStatus(){
  return this.roleStatusListener.asObservable()
}

Error(){
  return this.errorStatusListener.asObservable()
  }



//extra added

private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.timer = setTimeout(() => {
      this.signout();
    }, duration*1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }





  

uploadImage(photo,owners){
  // console.log(photo)
  const data={
    photo:photo
  }
        this.http.put<{message:string}>('http://localhost:3000/api/upload/'+owners,data).subscribe(data=>{
            console.log(data.message)
        },error=>{
            console.log(error.error)
        })
}



           
}







