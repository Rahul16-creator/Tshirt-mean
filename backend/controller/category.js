const Category=require('../models/catagory')
const { ObjectId } = require('mongodb')

exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err || !cate){
            return res.status(404).json({"message":"Category is not found !!"})
        }
        console.log(req.category)

        req.category=cate

    })
    next()
}


exports.createCategory=(req,res)=>{

       const category=new Category(req.body)

       category.save((err,cate)=>{
        if(err){
            return res.status(404).json({"message":"Category is not created !!"})
        }

        res.json(cate)

       })

}


exports.getCategory=(req,res)=>{

    return res.json(req.category)

}


exports.getCategories=(req,res,next)=>{


    Category.find({}).exec((err,cate)=>{
        if(err|| !cate){
            return res.status(404).json({"message":"Category are not found !!"})
        }
        console.log(cate)
        return res.json(cate)
    })

}


exports.updateCategory=(req,res)=>{


    Category.updateOne({_id:req.category._id},{$set:req.body},{new:true})
    .exec((err,cate)=>{
        if(err|| !cate){
            return res.status(404).json({"message":"Category are not updated !!"})
        }
        return res.json(cate)
    })
}



exports.deleteCategory=(req,res)=>{


    const cate=req.category


    cate.remove((err)=>{
        if(err){
            return res.status(404).json({"message":"Category are not updated !!"})
        }
        return res.json("deleted successfully")
    })
}