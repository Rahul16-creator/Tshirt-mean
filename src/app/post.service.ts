import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit {

  constructor(private http:HttpClient,private authService:AuthService) { }

  owner
  ngOnInit(){
this.owner=this.authService.getOwner()
  }

  AddProduct(name:string,description:string,price:number,stock:number,category,owners){

    const data={
      name:name,
      description:description,
      price:price,
      category:"summer",
      stock:stock,
    }
    console.log(owners)

    this.http.post<{message:string}>('http://localhost:3000/api/product/create/'+owners,data).subscribe((data)=>{
            console.log("data",data.message)
    },error=>{
            console.log(error.error)
    })
  }


  AddCategory(cate,owners){
    this.http.post('http://localhost:3000/api/category/create/'+owners,{
      name:cate
    }).subscribe(data=>{
      console.log(data)
    },error=>{
      console.log(error.error)
    })
  }


  getCategory(){
    return this.http.get('http://localhost:3000/api/categories')
  }

  getProducts(){
    return this.http.get('http://localhost:3000/api/products')
  }

  getProductById(id,owners){
       return this.http.get('http://localhost:3000/api/product/'+ id +'/'+owners)
  }

  updateProduct(id,name,description,price,stock,owners){

    const data={
      name:name,
      description:description,
      price:price,
      stock:stock
    }
             this.http.put<{message:string}>('http://localhost:3000/api/product/'+ id +'/'+owners,data).subscribe(data=>{
                  console.log(data.message)
             },error=>{
                  console.log(error.error)
             })
  }
  deleteProduct(id,owners){
         return  this.http.delete('http://localhost:3000/api/product/'+ id +'/'+owners)
  }

//categories

  getCategoryById(id,owners){
    return this.http.get('http://localhost:3000/api/category/'+ id +'/'+owners)
}

updateCategory(id,name,owners){

 const data={
   name:name
 }


 console.log(data ,owners,id)
          this.http.put<{message:string}>('http://localhost:3000/api/category/'+ id +'/'+owners,data).subscribe(data=>{
               console.log(data.message)
          },error=>{
               console.log(error.error)
          })
}

deleteCategory(id,owners){
    this.http.delete('http://localhost:3000/api/category/'+ id +'/'+owners).subscribe(data=>{
      console.log(data)
    })

}

uploadImage(id,photo,owners){
  // console.log(photo)
  const data={
    photo:photo
  }
        this.http.put<{message:string}>('http://localhost:3000/api/product-image/'+ id +'/'+owners,data).subscribe(data=>{
            console.log(data.message)
        },error=>{
            console.log(error.error)
        })
}


//get user 

getUser(owner){
  return this.http.get('http://localhost:3000/api/user/'+owner)
}



updateUser(name,passwords,address,city,owners){

  const data={
    name:name,
    password  :passwords,
    address:address,
    city:city
  }
 
 
  console.log(data ,owners)
           this.http.put<{message:string}>('http://localhost:3000/api/user/'+owners,data).subscribe(data=>{
                console.log(data.message)
           },error=>{
                console.log(error.error)
           })
 }


}
