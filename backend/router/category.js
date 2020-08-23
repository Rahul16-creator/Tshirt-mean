const express=require('express')
const router=express.Router()

const AuthController=require('../controller/auth')
const UserController=require('../controller/user')
const CategoryController=require('../controller/category')

router.param("userId",UserController.getUserById)

router.param("categoryId",CategoryController.getCategoryById)

router.post('/category/create/:userId',AuthController.isSignedIn,AuthController.isAuthenticated,AuthController.isAdmin,CategoryController.createCategory)

router.get('/category/:categoryId/:userId',AuthController.isSignedIn,AuthController.isAuthenticated,AuthController.isAdmin, CategoryController.getCategory)

router.get('/categories',CategoryController.getCategories)

router.put('/category/:categoryId/:userId',AuthController.isSignedIn,AuthController.isAuthenticated,AuthController.isAdmin,CategoryController.updateCategory)

router.delete('/category/:categoryId/:userId',AuthController.isSignedIn,AuthController.isAuthenticated,AuthController.isAdmin,CategoryController.deleteCategory)


module.exports=router