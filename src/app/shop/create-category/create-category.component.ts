import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private postService:PostService,private authService:AuthService) { }

  @ViewChild('f') Category:NgForm
  id
  ngOnInit(): void {
   this.id= this.authService.getOwner()
  }
  onsubmit(){
    this.postService.AddCategory(this.Category.value.name,this.id)
    this.Category.reset()
  }
}
