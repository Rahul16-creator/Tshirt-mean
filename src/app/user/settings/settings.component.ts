import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/post.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private authService:AuthService,private postService:PostService,private router : Router) { }

  name:string
  email:string
  error=false
  address
  city
  
  msg=null
  Array
ids
  @ViewChild('f') setting:NgForm

  ngOnInit(){ 

  this.Array=this.authService.getOwner()
  this.postService.getUser(this.Array).subscribe(data=>{
    console.log(data)
    this.name=data['name']
    this.ids=data['_id']
    this.email=data['email']
    this.address=data['address']
    this.city=data['city']
    console.log(data['name'])
    console.log(data['email'])
  })

}


onSubmit(){

  console.log(this.setting.value.newpassword)

  console.log(this.setting.value.newpassword)


  if(this.setting.value.newpassword==this.setting.value.confirmpassword) {
    this.error=false
      this.postService.updateUser(this.setting.value.name,this.setting.value.newpassword,this.setting.value.address,this.setting.value.city,this.ids)
      this.router.navigate(['/user'])
  }
  else {
    console.log(this.setting.value.newpassword)
this.error=true
this.msg="Password does'nt match"
  }


}


}
