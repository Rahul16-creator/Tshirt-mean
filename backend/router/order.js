const express=require('express')
const router=express.Router()

const AuthController=require('../controller/auth')
const UserController=require('../controller/user')
const ProductController=require('../controller/product')
const orderController=require('../controller/order')

router.param("userId",UserController.getUserById)
router.param("orderId",orderController.getOrderById)

router.post('/order/create/:userId',
AuthController.isSignedIn,
AuthController.isAuthenticated,
UserController.pushPurchaseOrder,
ProductController.inventory,
orderController.createOrder)

router.get('/order/all/:userId',
AuthController.isSignedIn,
AuthController.isAuthenticated,
AuthController.isAdmin,
orderController.getAllOrders)

router.get('/order/status/:userId',
AuthController.isSignedIn,
AuthController.isAuthenticated,
AuthController.isAdmin,
orderController.getStatus)


router.put('/order/:orderId/status/:userId',
AuthController.isSignedIn,
AuthController.isAuthenticated,
AuthController.isAdmin,
orderController.UpdateStatus)


//checkouts

router.post('/checkout/:userId',
AuthController.isSignedIn,
AuthController.isAuthenticated,
orderController.createCheckouts)

router.get('/checkout/:userId',
AuthController.isSignedIn,
AuthController.isAuthenticated,
orderController.getCheckouts)



router.delete('/checkout/:checkout/:userId',
AuthController.isSignedIn,
AuthController.isAuthenticated,
orderController.deleteCheckout)

module.exports=router