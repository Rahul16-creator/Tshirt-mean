import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(private postService:PostService) { }

  products=[]
  ngOnInit(): void {
    this.postService.getProducts().subscribe(data=>{
         this.products.push(data)
    })
  }

  onsubmit(){

  }
}
