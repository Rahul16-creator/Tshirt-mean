const mongoose=require('mongoose')


const catagorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:30,
        unique:true,
        trim:true
    }
},{timestamps:true})


const Catagory=mongoose.model('Catagory',catagorySchema)


module.exports=Catagory