import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  
})
export class SignupComponent implements OnInit {

  constructor(private authService:AuthService) { }
@ViewChild('f') signup:NgForm

  onsubmit(){

    this.authService.signup(this.signup.value.username,this.signup.value.email,this.signup.value.password)

console.log(this.signup.value.username)
this.signup.reset()

  }
  ngOnInit(): void {
  }

}
