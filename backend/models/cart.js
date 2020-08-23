const mongoose=require('mongoose')
const { ObjectId } = require('mongodb')

const productSchema=new mongoose.Schema({
    prodId:{
        type:ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:30
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:1000
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        maxlength:30
    },
    sold:{
        type:Number,
        default:1
    },
    photo:{
        type:String
        
    },
    owner:{
        type:ObjectId,
        required:true
    }
   
},{timestamps:true})


const Product=mongoose.model("cart",productSchema)

module.exports=Product