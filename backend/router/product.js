const express=require('express')
const router=express.Router()

const AuthController=require('../controller/auth')
const UserController=require('../controller/user')
const ProductController=require('../controller/product')


const multer=require('multer')
let path;

const storage=multer.diskStorage({
    filename:function(req,file,cb){
          cb(null,new Date().toString().replace(/[\/\\:]/g, "_") + file.originalname)
    }
})

  const upload=multer({
   storage:storage,
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){

        if(!file.originalname.match(/\.(doc|docx|jpg|jpeg|png|pdf|csv)$/)){
              return cb(new Error('please upload the file correctly')) 
        }
        cb(undefined,true)
    }
})



router.param("userId",UserController.getUserById)
router.param('productId',ProductController.getProductById)

router.get('/product/:productId/:userId',AuthController.isSignedIn,AuthController.isAuthenticated,ProductController.getProduct)

router.get('/products',ProductController.getProducts)

router.get('/product/categories',ProductController.getUniqueCategory)

router.post('/product/create/:userId',AuthController.isSignedIn,AuthController.isAuthenticated,AuthController.isAdmin,ProductController.createProduct)

router.put('/product/:productId/:userId',AuthController.isSignedIn,AuthController.isAuthenticated,AuthController.isAdmin,ProductController.updateProduct)

router.delete('/product/:productId/:userId',AuthController.isSignedIn,AuthController.isAuthenticated,AuthController.isAdmin,ProductController.deleteProduct)

router.put('/product-image/:productId/:userId',upload.single('image'),AuthController.isSignedIn,AuthController.isAuthenticated,AuthController.isAdmin,ProductController.updatePhoto)




module.exports=router