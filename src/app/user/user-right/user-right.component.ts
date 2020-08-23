import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-user-right',
  templateUrl: './user-right.component.html',
  styleUrls: ['./user-right.component.css']
})
export class UserRightComponent implements OnInit {
  constructor(private authService:AuthService,private postService:PostService) { }

  name:string
  email:string
  
  Array

  ngOnInit(){ 

  this.Array=this.authService.getOwner()
  this.postService.getUser(this.Array).subscribe(data=>{
    console.log(data)
    this.name=data['name']
    this.email=data['email']
    console.log(data['name'])
    console.log(data['email'])
  })
  


}


}
