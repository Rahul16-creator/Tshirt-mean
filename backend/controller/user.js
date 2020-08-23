const User=require('../models/user')
const Order=require('../models/orders')
const { ObjectId } = require('mongodb')

exports.getUserById=(req,res,next,id)=>{
    User.findById({_id:id}).exec((err,user)=>{

        if(err || !user){
            return res.status(404).json({message:"no user found!!"})
        }
        req.profile=user
        next();
    })
}

exports.getUser=(req,res)=>{

    User.findOne({_id:ObjectId(req.params.userId)}).exec((err,user)=>{

        if(err || !user){
            return res.status(404).json({message:"no user for  update  is found!!"})
        }
       
        res.json(user)

    })
}


exports.userUpdate=(req,res)=>{

    User.findByIdAndUpdate({_id:req.profile._id},{$set:req.body},{new:true,useFindAndModify:false}).exec((err,user)=>{

        if(err || !user){
            return res.status(404).json({message:"no user for  update  is found!!"})
        }
       console.log(req.body)
       
        res.json({message:user})

    })
}

exports.userPurchase=(req,res,next)=>{

    Order.find({_id:req.profile._id}).populate("user","id name").exec((err,order)=>{
        if(err || !order){
            return res.status(404).json({message:"No orders Yet!!"})

        }

        res.json(order)
    })

}



exports.pushPurchaseOrder=(req,res,next)=>{

let purchase=[]

req.body.order.product.forEach(product=>{
purchase.push({
    _id:product._id,
    name:product.name,
    description:product.description,
    catagory:product.catagory,
    quantity:product.quantity,
    amount:req.body.order.amount,
    transaction_id:req.body.order.transaction_id
})
})

User.findOneAndUpdate({_id:req.profile._id},{$push:{purchase:purchase}},{new:true}).exec((err,user)=>{
    
    if(err || !user){
        return res.status(404).json({message:"No orders Yet!!"})
    }
})

next()
}