//we use .env file to enable single modification throught entire application
require('dotenv').config();

const express = require('express');
const app = express();
// we use mongoose package to interact with mongodb 
const mongoose = require('mongoose'); 

//use express file upload
const fileUpload = require('express-fileupload')

//:27017 is default port running mongo
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use(express.json())
app.use(fileUpload())

const catRoute = require('./routes/category')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const tagRoute = require('./routes/tag')
const commentRoute = require('./routes/comment')

app.use('/cats/',catRoute)
app.use('/users',userRoute)  
app.use('/posts',postRoute)
app.use('/tags',tagRoute)
app.use('/comments',commentRoute)

app.use((err,req,res,next)=>{
    err.status = err.status || 200
    res.status(err.status).json({
        con:false,
        msg:err.message
    })
})
app.listen(process.env.PORT,console.log(`Server is running at port ${process.env.PORT}`));