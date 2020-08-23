import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit,OnDestroy {

  constructor(private authService:AuthService,private router:Router) { }

  isError=null
  private errorListenersubs:Subscription
  @ViewChild('f') signin:NgForm

  onsubmit(){
       
    this.authService.signin(this.signin.value.email,this.signin.value.password)
    this.signin.reset()
    this.errorListenersubs=this.authService.Error().subscribe(error=>{
      this.isError=error
    })
  }
  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    // this.errorListenersubs.unsubscribe()
  }

  
  // onClose(){
  // this.router.navigate(['/'])
  // }

}
