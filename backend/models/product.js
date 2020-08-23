const mongoose=require('mongoose')
const { ObjectId } = require('mongodb')

const productSchema=new mongoose.Schema({
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
    category:{
        type:String,
        ref:"Catagory",
        required:true
    },
    stock:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        type:String
        // contentType:String
    }
},{timestamps:true})


const Product=mongoose.model("Product",productSchema)

module.exports=Product