const {Order,ProductCart}=require('../models/orders')
const Checkout=require('../models/checkout')

exports.getOrderById=(req,res,next,id)=>{
    Order.findById(id)
    .populate("product.product","name price")
    .exec((err,order)=>{ 
        if(err || !order){
            return res.status(404).json({message:"no order found!!"})
        }
        req.order=order
    })
}


exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile
    const order=new Order(req.body.order)
    order.save((err,order)=>{
        if(err || !order){
            return res.status(404).json({message:"no order found!!"})
        }
        res.json(order)
    })

}



exports.getAllOrders=(req,res)=>{
    Order.find().populate("user","_id name").exec((err,order)=>{
        if(err || !order){
            return res.status(404).json({message:"no order found!!"})
        }
        res.json(order)
    })
}


exports.getStatus=(req,res)=>{
    res.json(Order.schema.path("status").enumValues);
}


exports.UpdateStatus=(req,res)=>{
    Order.update({_id:req.body.orderId},
        {$set:{status:req.body.status}}).exec((err,order)=>{
            if(err || !order){
                return res.status(404).json({message:"order update failed!!"})
            }
            res.json(order)
        })
}


//checkouts


exports.createCheckouts=async(req,res)=>{

  const prod= await  Checkout.insertMany(req.body.prod)
  console.log(prod)

   res.json("checkout insert")
}




exports.getCheckouts=async(req,res)=>{

  const prod= await  Checkout.find({owner:req.params.userId})
//   console.log(prod)

   res.json(prod)
}





exports.deleteCheckout=async(req,res)=>{

    const prod= await  Checkout.deleteOne({_id:req.params.checkout,owner:req.params.userId})
    console.log("deleted",prod)
  
     res.json(prod)
  }