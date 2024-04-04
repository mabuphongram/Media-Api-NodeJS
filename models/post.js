const mongoose = require('mongoose')
const {Schema} = mongoose

const PostSchema = new Schema({
    user:{type:Schema.Types.ObjectId,required:true,ref:"user"},
    cat:{type:Schema.Types.ObjectId,required:true,ref:"cat"},
    tag:{type:Schema.Types.ObjectId,required:true,ref:"tag"},
    comment:{type:Schema.Types.ObjectId,ref:"comment"},
    like:{type:Number,default:0},
    image:{type:String, required:true},
    title:{type:String,required:true},
    desc:{type:String,required:true},
    create:{type:Date,default:Date.now},

})

const Post =  mongoose.model('post',PostSchema)
module.exports = Post