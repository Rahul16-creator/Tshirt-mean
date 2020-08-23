import { Component, OnInit,ViewChild } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-merge-category',
  templateUrl: './merge-category.component.html',
  styleUrls: ['./merge-category.component.css']
})
export class MergeCategoryComponent implements OnInit {

  constructor(private postService:PostService,private authServeice:AuthService,private router : Router) { }
  loading=true
  edit=false
  categories=[]
  updatedCategory=[]
  ids
  @ViewChild('f') update:NgForm
  ngOnInit(): void {

    this.ids=this.authServeice.getOwner()

    this.postService.getCategory().subscribe(data=>{
      console.log(data)
     for(let i in data){
      this.categories.push({id:data[i]['_id'],name:data[i]['name']})
     }
      this.loading=false
    })
  }

  onUpdate(id){
    this.edit=true
    this.postService.getCategoryById(id,this.ids).subscribe(data=>{
      this.updatedCategory.push({id:data['_id'],name:data['name']})
    })

  }

  onDelete(id){
      this.postService.deleteCategory(id,this.ids)
      this.categories=this.categories.filter(data=>{
        return data.id!=id
      })
  }


  onsubmit(id){
      this.postService.updateCategory(id,this.update.value.name,this.ids)
      this.router.navigate(['/admin'])

  }


}
