import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService  {

  constructor(private http:HttpClient,private router:Router,private authServeice:AuthService) { }

  AddCart(id,name:string,description:string,price:number,photo:string,owner:string){

    const data={
      prodId:id,
      name:name,
      description:description,
      price:price,
      photo:photo,
      owner:owner
    }
    
    this.http.post<{message:string}>('http://localhost:3000/api/cart/create/'+owner,data).subscribe((data)=>{
      // this.router.navigate(['/cart/'+id])

    },error=>{
            console.log(error.error)
    })
  }



  getCarts(owner:string){
   
    return this.http.get('http://localhost:3000/api/carts/'+owner)
  }

  
  updateCart(id,sold,owner){
   

             this.http.put<{message:string}>('http://localhost:3000/api/cart/'+ id +'/'+owner,{sold:sold}).subscribe(data=>{
                  console.log(data.message)
             },error=>{
                  console.log(error.error)
             })
  }
  deleteCart(id,owner){
    
   
         return  this.http.delete('http://localhost:3000/api/cart/'+ id +'/'+owner)
  }


  addcheckout(prod,owner){

    const data={prod}
    
    this.http.post<{message:string}>('http://localhost:3000/api/checkout/'+owner,data).subscribe((data)=>{
      // this.router.navigate(['/cart/'+id])

    },error=>{
            console.log(error.error)
    })
  }



  getcheckout(owner:string){
   
    return this.http.get('http://localhost:3000/api/checkout/'+owner)
  }

  
  deleteCheckout(proid,owner){
   
     this.http.delete('http://localhost:3000/api/checkout/'+ proid +'/'+owner).subscribe((data)=>{
          console.log(data)
     })
  }



}
