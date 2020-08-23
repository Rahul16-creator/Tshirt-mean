const Cart=require('../models/cart')
const { ObjectId } = require('mongodb')

exports.createProduct=async (req,res,next)=>{

    
        Cart.findOne({prodId:req.body.prodId,owner:req.params.userId}).exec((err,product)=>{
            // console.log(product)
           if(product){
            console.log(req.profile._id)

            product.sold=product.sold+1
            product.save((err,product)=>{return "saved"  })
            
           }
           else {
            const cart=new Cart(req.body)
            cart.save((err,product)=>{
             return  res.send("saved success")
           })
           }
              
               
        })


        

       
       
       
       
}    




exports.updateProduct=(req,res,next)=>{
console.log(req.body)
   
    Cart.updateOne({_id:ObjectId(req.params.cartId),owner:req.params.userId},{$set:{sold:req.body.sold}},{new:true}).exec((err,product)=>{
                if(err || !product){
                    return res.status(404).json({"message":"updated not saves!!"})
                }
                
                res.send("updated success")
            })
     
}


exports.deleteProduct=async (req,res,next)=>{

    
    console.log(req.params.cartId)
    Cart.deleteOne({_id:ObjectId(req.params.cartId),owner:req.params.userId}).then(res=>{
        console.log("deleted success")
    }).catch(error=>{
        res.send("Not deleted")
    })
       
}



exports.getProducts=(req,res)=>{

   
    Cart.find({owner:req.params.userId}).exec((err,product)=>{
        if(err || !product){
            return res.status(404).json({"message":"no product found!!"})
        }

        res.json(product)
    })

}

