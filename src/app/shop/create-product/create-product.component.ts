import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../post.service'
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(private postService:PostService,private authService:AuthService) { }
id
  ngOnInit(): void {
   this.id= this.authService.getOwner()
  }

  @ViewChild('f') AddProduct:NgForm

  onsubmit(){
    this.postService.AddProduct(this.AddProduct.value.name,this.AddProduct.value.description,this.AddProduct.value.price,this.AddProduct.value.stock,this.AddProduct.value.value,this.id)
    this.AddProduct.reset()
  }
}
