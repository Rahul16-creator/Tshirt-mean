const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/MERN',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
