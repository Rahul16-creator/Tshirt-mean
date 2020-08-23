const mongoose=require('mongoose')
const crypto = require('crypto');
const { v4: uuidv1 } = require('uuid');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        maxlength:30,
        required:true
    },
    lastname:{
        type:String,
        trim:true,
        maxlength:30,
        // required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    secure_password:{
        type:String,
        minlength:6,
        required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchase:{
        type:Array,
        default:[]
    },
    photo:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    }
},
{
    timestamps:true
})


userSchema.virtual("password")
  .set(function(password){
    this._password=password
    this.salt=uuidv1()
    this.secure_password=this.securePassword(password)
  })
  .get(function(){
      return this._password
  })


userSchema.methods={

    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.secure_password
    },
    securePassword:function(plainpassword){
                
        if(!plainpassword) return ""
        try{
              return crypto.createHmac('sha256', this.salt)
              .update(plainpassword)
              .digest('hex');
        }catch(error){
                 return ""
        }
    }
}


const User=mongoose.model('User',userSchema)

module.exports=User