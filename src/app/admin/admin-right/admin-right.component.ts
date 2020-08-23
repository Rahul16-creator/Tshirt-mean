import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-admin-right',
  templateUrl: './admin-right.component.html',
  styleUrls: ['./admin-right.component.css']
})
export class AdminRightComponent implements OnInit {

  constructor(private authService:AuthService,private postService:PostService) { }

  name:string
  email:string
  
  Array

  ngOnInit(){ 

    this.Array=this.authService.getOwner()
    this.postService.getUser(this.Array).subscribe(data=>{
    
    this.name=data['name']
    this.email=data['email']
  })
  


}

}