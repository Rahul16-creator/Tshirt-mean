const express=require('express')
const router=express.Router()
const { check, validationResult } = require('express-validator');


const AuthController=require('../controller/auth')

router.post('/signup',[check('name',"name must be atleast 3 letters").isLength({ min: 3 }),check('email',"please enter the email").isEmail(),check('password').isLength({ min: 1 }) ],AuthController.Signup)

router.post('/signin',[check('email',"please enter the email").isEmail(),check('password').isLength({ min: 5 }) ],AuthController.Singin)

router.put('/upload/:userId',AuthController.update)

router.get('/signout',AuthController.Signout)

router.get('/test',AuthController.isSignedIn,(req,res)=>{
      res.send(req.auth)
})


module.exports=router