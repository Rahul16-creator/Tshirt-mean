const express=require('express')

require('./database/db')
require('dotenv').config()
const cookieParser=require('cookie-parser')
const cors=require('cors')
const bodyParser=require('body-parser')

const authRouter=require('./router/auth')
const userRouter=require('./router/user')
const categoryRouter=require('./router/category')
const productRouter=require('./router/product')
const orderRouter=require('./router/order')
const cartRouter=require('./router/cart')

const app=express()

const port=process.env.PORT || 8000

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true}))


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });



app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api',authRouter)
app.use('/api',userRouter)
app.use('/api',categoryRouter)
app.use('/api',productRouter)
app.use('/api',orderRouter)
app.use('/api',cartRouter)

module.exports=app