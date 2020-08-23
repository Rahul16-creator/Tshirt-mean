import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit,OnDestroy {

  products=[]
  ids:string
  loading=true
  // owner:Subscription
  constructor(private postService:PostService,private router:Router,private cartService:CartService,private authService:AuthService) { }

  ngOnInit() {
    
    
    this.postService.getProducts().subscribe(data=>{
      console.log(data)
     for(let i in data){
      this.products.push({id:data[i]['_id'],name:data[i]['name'],price:data[i]['price'],description:data[i]['description'],img:data[i]['photo']})
     }
      this.loading=false
    })

    // this.owner=this.authService.getOwner().subscribe(data=>{
    //   console.log("data"+data)
    //   this.ids=data
    // })
    this.ids=this.authService.getOwner()

    
  }










  onCart(id,name,description,price,photo){
    this.cartService.AddCart(id,name,description,price,photo,this.ids)
    setTimeout(()=>{
        this.router.navigate(['/cart/'+this.ids])
    },500)

  }

  ngOnDestroy(){
    // this.owner.unsubscribe()
  }










  



@HostListener("window:scroll", []) onWindowScroll() {
  this.scrollFunction();
}
// When the user scrolls down 20px from the top of the document, show the button
scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("myBtn").style.display = "block";
  } else {
      document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 





}








