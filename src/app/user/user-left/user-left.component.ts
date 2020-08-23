import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-left',
  templateUrl: './user-left.component.html',
  styleUrls: ['./user-left.component.css']
})
export class UserLeftComponent implements OnInit {

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
      if(data['photo']!=undefined)
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
