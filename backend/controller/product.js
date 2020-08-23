const Product=require('../models/product')
const formidable=require('formidable')
const _ = require('lodash')
const fs=require('fs')
const { sortBy } = require('lodash')
const { ObjectId } = require('mongodb')



exports.getProductById=(req,res,next,productId)=>{

    console.log(productId)
    Product.findById(productId).exec((err,product)=>{
        // console.log(product)
        if(err || !product){
            return res.status(404).json({"message":"no product found!!"})
        }
        req.product=product
    })
    next()
}


exports.getProduct=(req,res)=>{
     req.product.photo=undefined
     return res.json(req.product)
}



exports.createProduct=(req,res,next)=>{


    // let form=new formidable({ multiples: true })
    // form.keepExtensions=true

    // form.parse(req,(err,fields,file)=>{

    //     if(err){
    //         return res.status(404).json({"message":"err in image formidable"})
    //     }

    //     console.log(fields)
        
    //     const product=new Product(fields)
       
    //     if(file.photo){
           
    //         if(file.photo.size>3000000){
    //             return res.status(404).json({"message":"file size is too large!!!!"})
    //         }

    //         product.photo.data=fs.readFileSync(file.photo.path)
    //         product.photo.contentType=file.photo.type
    //     }

    //     product.save((err,product)=>{
    //         if(err || !product){
    //             return res.status(404).json({"message":"product not saves!!"})
    //         }
    //         product.photo=undefined
    //         res.json("product Saved Success!!")
    //     })
        
    // })

    
    const product=new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
    })

    product.save((err,product)=>{
              if(err || !product){
                  return res.status(404).json({"message":"product not saves!!"})
              }
            
              res.send(product)
          })
}    




exports.updateProduct=(req,res,next)=>{

    // let form=new formidable.IncomingForm()
    // form.keepExtensions=true

    // form.parse(req,(err,fields,file)=>{

    //     if(err){
    //         return res.status(404).json({"message":"err in image formidable"})
    //     }
    //     const product=req.product

    //     product=_.extend(product,fields)

    //     if(file.photo){
           
    //         if(file.photo.size>3000000){
    //             return res.status(404).json({"message":"file size is too large!!!!"})
    //         }

    //         product.photo.data=fs.readFileSync(file.photo.path)
    //         product.photo.contentType=file.photo.type
    //     }

    //     product.save((err,product)=>{
    //         if(err || !product){
    //             return res.status(404).json({"message":"updated not saves!!"})
    //         }
    //         product.photo=undefined
    //         res.json(product)
    //     })
        
    // })


    Product.updateOne({_id:ObjectId(req.params.productId)},{$set:req.body}).exec((err,product)=>{
                if(err || !product){
                    return res.status(404).json({"message":"updated not saves!!"})
                }
                
                res.send("updated success")
            })
     
}




exports.deleteProduct=(req,res,next)=>{
    
    const product=req.product
        product.remove(err=>{
            if(err || !product){
                return res.status(404).json({"message":"product not deleted!!!!"})
            }
            res.json({"message":"product deleted!!!!"})
        })

}



exports.getProducts=(req,res)=>{

    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    let sortBy=req.query.sortBy? req.query.sortBy : "_id"

    Product.find().sort([[sortBy,"asc"]])
    .limit(limit)
    // .select("-photo")
    // .populate("category")
    .exec((err,product)=>{
        if(err || !product){
            return res.status(404).json({"message":"no product found!!"})
        }

        res.json(product)
    })

}


exports.getUniqueCategory=(req,res)=>{

    Product.distinct("category",{},(err,product)=>{
        if(err || !product){
            return res.status(404).json({"message":"no product found!!"})
        }

        res.json(product)
    })

}

exports.inventory=(req,res,next)=>{

    let operation=req.body.order.product.map(prod=>{
        return{
            updateOne:{
                filter:{_id:prod._id},
                update:{$inc:{stock:-prod.count,sold:+prod.count}}
            }
        }
    })
    Product.bulkWrite(operation,{},(err,product)=>{
        if(err || !product){
            return res.status(404).json({"message":"inventory is not updated"})
        }
        res.json({"message":"inventory is updated"})
    })
}





exports.updatePhoto=async (req,res,next)=>{

        const product=await Product.findOne({_id:ObjectId(req.params.productId)})
        product.photo=req.body.photo
        await product.save()
        res.send("photo uploaded")
     
}

