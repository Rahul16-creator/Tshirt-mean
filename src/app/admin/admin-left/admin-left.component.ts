import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-admin-left',
  templateUrl: './admin-left.component.html',
  styleUrls: ['./admin-left.component.css']
})
export class AdminLeftComponent implements OnInit {

  constructor(private authService:AuthService,private postService:PostService) { }

@ViewChild('f') photo:NgForm
id:string
file:File=null
img=null
  pic="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjCemveIRwfTi_65Mn-mUYxmkrawpMR54RGQ&usqp=CAU"
  
  Array

  ngOnInit(){ 
  this.Array=this.authService.getOwner()
  this.postService.getUser(this.Array).subscribe(data=>{
    this.pic=data['photo']
  })
  


 

    // / console.log(this.pic)
  
}

onFile(event:FileList){
  this.file=<File>event.item(0)
  console.log(this.file)

}

onsubmit() {

const reader=new FileReader()
reader.onload=(event:any)=>{
     this.img=event.target.result
     this.pic=this.img
     console.log(this.Array)
     this.authService.uploadImage(this.img,this.Array);
}
reader.readAsDataURL(this.file)

}

}
