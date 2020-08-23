const express=require('express')
const router=express.Router()

const AuthController=require('../controller/auth')
const UserController=require('../controller/user')

router.param("userId",UserController.getUserById)

router.get("/user/:userId",AuthController.isSignedIn,AuthController.isAuthenticated,UserController.getUser)

router.put("/user/:userId",AuthController.isSignedIn,AuthController.isAuthenticated,UserController.userUpdate)

router.get("/order/user/:userId",AuthController.isSignedIn,AuthController.isAuthenticated,UserController.userPurchase)




module.exports=router