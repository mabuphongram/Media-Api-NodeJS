const DB = require('../models/post')
const CommentDB = require('../models/comment')
const Helper = require('../utils/helper')
const all = async(req,res,next)=> {
    let posts = await DB.find().populate('user cat','-password -__v')
    Helper.fMsg(res,"All Posts",posts)
}

const get = async(req,res,next)=>{
    //how to select wanted attribute
    // let post = await DB.findById(req.params.id).select('title desc')
    let post = await DB.findById(req.params.id).populate('user tag cat','-password -__v -created -_id')
    let comments = await CommentDB.find({postId:post._id})
    //we must tranfrom object to inject
    post = post.toObject()
    post.comments = comments
    // post["comments"] = comments
    if(post) {
        Helper.fMsg(res,'Single Post',post)
    } else {
        next(new Error('No post with that id'))
    }
}
const post = async(req,res,next)=>{
    let userId = req.body.user._id
    delete req.body.user
    req.body.user = userId
    let result = await new DB(req.body).save()
    Helper.fMsg(res,'Post Added',result)
}

//put title and desc 
const put = async(req,res,next)=>{
    let post = await DB.findById(req.params.id)
    if(post){
        await DB.findByIdAndUpdate(post._id,req.body)
        let result = await DB.findByIdAndUpdate(post._id)
        Helper.fMsg(res,'Post Putted',result)
    }
}
const drop = async(req,res,next)=>{
    let post = await DB.findById(req.params.id)
    if(post) {
        await DB.findByIdAndDelete(post._id)
        Helper.fMsg(res,"Post is deleted")
    } else {
        Helper.fMsg(res,"No Post found with that id")
    }
} 

const byCat = async(req,res,next)=>{
let posts = await DB.find({cat:req.params.id})
Helper.fMsg(res,'Posts by Cat',posts)
}

const byUser = async(req,res,next)=>{
    let posts = await DB.find({user:req.params.id})
    if(posts){
        Helper.fMsg(res,'Posts by User',posts)
    } else {
        next(new Error('No post with that user id'))
    }
}
const byTag = async(req,res,next)=>{
    let posts = await DB.find({tag:req.params.id})
    if(posts){
        Helper.fMsg(res,'All Taged Posts',posts)
    } else {
        next(new Error('No post with that user id'))
    }
}

const paginate = async(req,res,next)=>{
    let page = req.params.page
    page = page == 1 ? 0 : page-1
    let limit = Number(process.env.POST_LIMIT)
    let skipCount = limit * page
    let posts = await DB.find().skip(skipCount).limit(limit)
    
    Helper.fMsg(res,"Paginated Posts",posts)
    
}

const toggle = async(req,res,next)=>{
    let post = await DB.findById(req.params.id)
    
    if(post){

        req.params.page == 1 ? post.like += 1 : post.like -= 1
        
        await DB.findByIdAndUpdate(post._id,post)
        let result = await DB.findById(post._id)
        Helper.fMsg(res,'Like Added',result)
    } else {
        next(new Error('No post with that user id'))
    }
}

module.exports = {
    all,
    get,
    post,
    put,
    drop,
    byCat,
    byUser,
    byTag,
    paginate,
    toggle
    
}