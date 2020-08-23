import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-merge-products',
  templateUrl: './merge-products.component.html',
  styleUrls: ['./merge-products.component.css']
})
export class MergeProductsComponent implements OnInit {

  constructor(private postService:PostService,private router:Router,private authService:AuthService) { }

  products=[]
  loading=true
  @ViewChild('f') update:NgForm
  updateproducts=[]
  Deletedproducts=[]
 ids

  edit=false
  ngOnInit(): void {

    this.ids=this.authService.getOwner()


    setTimeout(()=>{
      this.postService.getProducts().subscribe(data=>{
        console.log(data)
       for(let i in data){
        this.products.push({id:data[i]['_id'],name:data[i]['name'],stock:data[i]['stock'],img:data[i]['photo']})
       }
       
       this.loading=false
      })
    },500)

    
  }

  onUpdate(id){
    this.edit=true
      this.postService.getProductById(id,this.ids).subscribe(data=>{
          this.updateproducts.push({id:data['_id'],name:data['name'],stock:data['stock'],description:data['description'],price:data['price'],img:data['photo']})
      })
  }

  onDelete(id){
         

         this.postService.deleteProduct(id,this.ids).subscribe(data=>{
             console.log(data)     
        },error=>{
             console.log(error.error)
        })

        this.products = this.products.filter(function( obj ) {
          return obj.id !== id;
      });
  }

  onsubmit(id){
    this.postService.updateProduct(id,this.update.value.name,this.update.value.description,this.update.value.price,this.update.value.stock,this.ids)
    this.router.navigate(['/admin'])
  }
}