const mongoose=require('mongoose')
const { ObjectId } = require('mongodb')

const productSchema=new mongoose.Schema({
    prodId:{
        type:ObjectId,
        required:true
    },
    name:{
        type:String
    },
   amountstatus:{
       type:String
   },
   shippingstatus:{
       type:String
   },
   deliverystatus:{
       type:String
   }   ,
   owner:{
       type:ObjectId
   }
},{timestamps:true})


const Product=mongoose.model("checkouts",productSchema)

module.exports=Product