import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit ,OnDestroy {

  idss
  isAuthenticated=false

  private roleListernerSubs:Subscription
  private authListernerSubs:Subscription

  role


  constructor(private authService:AuthService) { }

  onsubmit(){
    this.isAuthenticated=false
    this.authService.signout()
  }


  ngOnInit(): void {
    this.idss=this.authService.getOwner()
    console.log(this.idss)

    this.roleListernerSubs=this.authService.getRoleListernerStatus().subscribe(res=>{
      this.role=res
    })

    this.authListernerSubs=this.authService.getAuthStatusListener().subscribe(res=>{
      this.isAuthenticated=res
    })

    // this.ids=this.authService.getOwner().subscribe(ids=>{
    //   this.idss=ids
    // })
   
  }


  ngOnDestroy(){

    this.authListernerSubs.unsubscribe()
    this.roleListernerSubs.unsubscribe()

  }
  

}
