import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-imgupload',
  templateUrl: './imgupload.component.html',
  styleUrls: ['./imgupload.component.css']
})
export class ImguploadComponent implements OnInit {

constructor(private postService:PostService,private routes : ActivatedRoute,private router : Router,private authService:AuthService) { }
@ViewChild('f') photo:NgForm
id:string
file:File=null
img=null
ids
  ngOnInit(): void {
 
    this.ids=this.authService.getOwner()
    this.routes.params.subscribe((params:Params)=>{
           this.id=params.id
    })
  }

  onFile(event:FileList){
       this.file=<File>event.item(0)
       console.log(this.file)

  }

  onsubmit() {

    const reader=new FileReader()
    reader.onload=(event:any)=>{
          this.img=event.target.result
          this.postService.uploadImage(this.id,this.img,this.ids);
          this.router.navigate(['/manage-product'])


    }
    reader.readAsDataURL(this.file)


  }


}
