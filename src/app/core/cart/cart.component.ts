import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CartService } from '../cart.service'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService:CartService,private router : Router,private authService:AuthService) { }
  alert=false
  message
cart=[]
loading=true
picture=false
total=0
owner:Subscription
ids:string
checkout=[]
  ngOnInit(): void {

  this.ids=this.authService.getOwner()
  console.log(this.ids)

    this.cartService.getCarts(this.ids).subscribe(data=>{
      
     for(let i in data){
      this.cart.push({id:data[i]['_id'],name:data[i]['name'],price:data[i]['price'],description:data[i]['description'],img:data[i]['photo'],sold:data[i]['sold']})
      this.total=this.total+(data[i]['price']*data[i]['sold'])
     }
    //  this.picture=true
    //  this.loading=false
     if(this.cart.length>0) {
          
          this.picture=false
        this.loading=false
     }
     else{
      this.picture=true
     }
    })
  }

  onAdd(id,Sold){
    const sold=parseInt(Sold)
        this.cartService.updateCart(id,sold+1,this.ids)
        const index=this.cart.findIndex(x=>x.id==id)
       
        this.cart[index].sold=sold+1;
        this.total=this.total+(this.cart[index].price*1)

  }

  onSubtract(id,Sold){
    const sold=parseInt(Sold)
    this.cartService.updateCart(id,sold-1,this.ids)
    const index=this.cart.findIndex(x=>x.id==id)
       
        this.cart[index].sold=sold-1;
        this.total=this.total-(this.cart[index].price*1)
  }


  onDelete(id){

    const index=this.cart.findIndex(x=>x.id==id)
       
    const solds=this.cart[index].sold
    const proce=this.cart[index].price*solds
    this.total=this.total-proce

    
    this.cartService.deleteCart(id,this.ids).subscribe(data=>{
      console.log(data)     
 },error=>{
      console.log(error.error)
 })

 this.cart = this.cart.filter(function( obj ) {
   return obj.id !== id;
});

if(this.cart.length>0) {
          
  this.picture=false
}
else{
this.picture=true
}
  }
  
@ViewChild('f') coupon:NgForm

  onSubmit(){
    if(this.coupon.value.coupon=="1234") {
      this.message= "Congragulation you have won discount of 30 Rupees"
     
    }
    else {
      this.message= "oops the coupon code wrong"
    }
    this.alert=true
  }


  onClose(){
this.alert=false
this.coupon.reset()
  }
 
onCheckout(){
for(let i in this.cart){
  this.checkout.push({prodId:this.cart[i]['id'],name:this.cart[i]['name'],owner:this.ids})
}
console.log(this.checkout)
this.cartService.addcheckout(this.checkout,this.ids)
this.router.navigate(['/'])
}

}
