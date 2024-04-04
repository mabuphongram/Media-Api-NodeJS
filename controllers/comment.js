const DB = require('../models/comment')
const Helper = require('../utils/helper')

const get = async(req,res,next)=>{
    let result = await DB.findById(req.params.id)
    Helper.fMsg(res,'All comment by post', result)
}

const add = async(req,res,next)=>{
    let result = await new DB(req.body).save()
    Helper.fMsg(res,'Comment is added',result)
}
const drop = async(req,res,next)=>{
    let dbComment = await DB.findById(req.params.id)
    if(dbComment){
        await DB.findByIdAndDelete(dbComment._id)
        Helper.fMsg(res,'Comment is Deleted')
    } else {
        next(new Error('No comment with that id'))
    }
    
}

module.exports = {
    add,
    drop,
    get
}