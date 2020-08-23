import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartService } from 'src/app/core/cart.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private postService:PostService,private router:Router,private authService:AuthService,private cartService:CartService) { }

  products=[]
  loading=true
  
 ids
 ship=false
 index=0
 delivery=false

  edit=false
  ngOnInit(): void {

    this.ids=this.authService.getOwner()


    setTimeout(()=>{
      this.cartService.getcheckout(this.ids).subscribe(data=>{
       for(let i in data){
        this.products.push({id:data[i]['_id'],name:data[i]['name']})
       }
       
       this.loading=false
      })
    },500)

    setTimeout(()=>{
           this.ship=true
    },2000)

    // 86400000
    setTimeout(()=>{
        this.delivery=true
        this.cartService.deleteCart(this.products[this.index]['id'],this.ids)
        this.index++;
    },3000)
    // 172800000
    console.log(this.products)
    
  }

 


 

  
}
