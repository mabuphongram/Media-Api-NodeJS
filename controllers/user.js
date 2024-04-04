const DB = require('../models/user')
const Helper = require('../utils/helper')


const login = async(req,res,next)=>{

    let phoneUser = await DB.findOne({phone:req.body.phone}).select("-__v")
    if(phoneUser){
        if(Helper.comparePass(req.body.password,phoneUser.password)){
            let user = phoneUser.toObject()
            delete user.password
            user.token = Helper.makeToken(user)

            Helper.fMsg(res,'Login Success',user)
        } else {
            next(new Error('credential error'))
        }
        
    
    } else {
        next('User credential error!')
    }
    
}
const register = async(req,res,next)=>{

    const nameUser = await DB.findOne({name:req.body.name})
    if(nameUser){
        next(new Error('That name is already used'))
    }

    let emailUser = await DB.findOne({email:req.body.email})
    if(emailUser) {
        next(new Error('Email is already in use'))
    }
    let phoneUser = await DB.findOne({email:req.body.phone})

    if(phoneUser){
        next(new Error('Phone is already in use'))
    }
    req.body.password = Helper.encode(req.body.password)
    let result = await new DB(req.body).save()
    Helper.fMsg(res,'register success',result)
}
module.exports = {
    login,
    register
}