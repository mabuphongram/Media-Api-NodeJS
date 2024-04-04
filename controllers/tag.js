const DB = require('../models/tag')
const helper = require('../utils/helper')

const all = async(req,res,next)=>{
        let tags= await DB.find()
        helper.fMsg(res,'All Tags',tags)
}

const add = async(req,res,next)=>{
    let dbTags = await DB.findOne({name:req.body.name})
    if(dbTags){
        next(new Error('Tag is already in use'))
    } else {
        let result = await new DB(req.body).save()
        helper.fMsg(res,'Tag Created',result)
    }
}

const get = async(req,res,next)=>{
    let result =await DB.findById(req.params.id)
    if(result){
        helper.fMsg(res,'Single Get',result)
    } else {
        next(new Error('No tag with that Id'))
    }
}
const put = async(req,res,next)=>{
    let result =await DB.findById(req.params.id)
    if(result){
        await DB.findByIdAndUpdate(result._id,req.body)
        let updatedTag = await DB.findById(result._id)
        helper.fMsg(res,'Tag is modified',updatedTag)
    } else {
        next(new Error('No tag with that Id'))
    }
}
const drop = async(req,res,next)=>{
    let result =await DB.findById(req.params.id)
    if(result){
        await DB.findByIdAndDelete(result._id)
        helper.fMsg(res,'Tag is deleted')
    } else {
        next(new Error('No tag with that Id'))
    }
}

module.exports = {
    all,
    add,
    get,
    put,
    drop
}