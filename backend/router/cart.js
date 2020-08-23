const express=require('express')
const router=express.Router()

const AuthController=require('../controller/auth')
const UserController=require('../controller/user')
const cartController=require('../controller/cart')

router.param("userId",UserController.getUserById)

// router.get('/carts',cartController.getProducts)

router.get('/carts/:userId',AuthController.isSignedIn,AuthController.isAuthenticated,cartController.getProducts)

router.post('/cart/create/:userId',AuthController.isSignedIn,AuthController.isAuthenticated,cartController.createProduct)

router.put('/cart/:cartId/:userId',AuthController.isSignedIn,AuthController.isAuthenticated,cartController.updateProduct)

router.delete('/cart/:cartId/:userId',AuthController.isSignedIn,AuthController.isAuthenticated,cartController.deleteProduct)


module.exports=router