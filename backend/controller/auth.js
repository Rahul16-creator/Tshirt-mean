const User=require('../models/user')
const { check, validationResult } = require('express-validator');
const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt');
const { ObjectId, ObjectID } = require('mongodb');

exports.Signup= (req,res)=>{

    const users=new User(req.body)
    
    const error=validationResult(req)
    
    if(!error.isEmpty()){
         return res.status(400).send(error.array()[0].msg)
    }

    
    users.save((err,user)=>{
    //       const token=jwt.sign({_id:user._id.toString()},process.env.SECRET,{expiresIn:'1h'})

    //     res.cookie("token",token,{expiresIn:'1h'})
        
    //     const {_id,name,email,role}=user
    //    return res.send({token,_id,name,email,role,exp:3600})
    res.send(user)
           
    })

      
    
}


exports.Singin=(req,res)=>{

    const {email,password} =req.body
    const error=validationResult(req)
    
    if(!error.isEmpty()){
         return res.status(400).send(error.array()[0].msg)
    }
    User.findOne({email},(err,user)=>{
        if(!user){
            return res.status(404).send({"message":"Email is not exist!!"})
        }
        if(!user.authenticate(password)){
            return res.status(404).send({"message":"Password is wrong!!"})
        }

       const token=jwt.sign({_id:user._id.toString()},process.env.SECRET,{expiresIn:'1h'})

       res.cookie("token",token,{expiresIn:'1h'})
       
       const {_id,name,email,role,photo}=user
       res.send({token,_id,name,email,photo,role,exp:3600,owner:_id})

    })
}


exports.update=async(req,res)=>{
    console.log(req.params.userId)
    await User.updateOne({_id:ObjectID(req.params.userId)},{$set:{photo:req.body.photo}},{new:true})
   
    res.send("photo uploaded")
}


exports.Signout=(req,res)=>{
    res.clearCookie('token')
    res.json({"message":"user signout successfully"})
} 


exports.isSignedIn=expressJwt({
    secret:process.env.SECRET,
    algorithms: ['HS256'],
    requestProperty:"auth"
})


exports.isAuthenticated=(req,res,next)=>{

    const checker=req.profile && req.auth && req.profile._id==req.auth._id
    if(!checker){
        return res.status(403).json({message:"ACCESS DENIED"})
    }
    next()
}


exports.isAdmin=(req,res,next)=>{

    if(req.profile.role==0){
        return res.status(404).json({message:"your are not admin!!"})
    }
    next()
}