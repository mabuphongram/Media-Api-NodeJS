
const DB = require('../models/category')
const Helper= require('../utils/helper')

const all = async(req,res,next)=>{
    let cats = await DB.find()
    Helper.fMsg(res,'All cats',cats)
}
const get = async(req,res,next)=>{
    let cat = await DB.findById(req.params.id)
    Helper.fMsg(res,'Single Category',cat)
}

const put = async(req,res,next)=>{
let dbCat = await DB.findById(req.params.id)
if(dbCat) {
    await DB.findByIdAndUpdate(dbCat._id,req.body)
    let result = await DB.findById(dbCat._id)
    Helper.fMsg(res,'Modified category',result)
} else {
    next(new Error('No category with that ID'))
    }

}

const add = async(req,res,next)=>{
   let dbCat = await DB.findOne({name:req.body.name})
   if(dbCat) {
    next(new Error('Category name is already in use'))
   }
   let result = await new DB(req.body).save()
   Helper.fMsg(res,"Category Saved",result)
}

const drop = async(req,res,next)=>{
 let dbGet = await DB.findById(req.params.id)

 if(dbGet){
    await DB.findByIdAndDelete(dbGet._id)
    Helper.fMsg(res,'Category Deleted')
 } else {
    next(new Error('No Category with that id'))
 }
}

module.exports = {
    all,
    add,
    get,
    put,
    drop
}