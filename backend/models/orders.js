const mongoose=require('mongoose')
const { ObjectID, ObjectId } = require('mongodb')

const ProductSchemaCart=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    proce:Number
})



const orderSchema=new mongoose.Schema({
    product:[ProductSchemaCart],
    transaction_id:{},
    amount:{
      type:Number
    },
    address:String,
    status:{
        type:String,
        default:"Received",
        enum:["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})


const ProductCart=mongoose.model("ProductCart",ProductSchemaCart)

const Order=mongoose.model("Order",orderSchema)

module.exports={
    Order,
    ProductCart
}