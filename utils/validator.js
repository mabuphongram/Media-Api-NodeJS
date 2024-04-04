const jwt = require('jsonwebtoken')
const UserDB = require('../models/user')
module.exports = {
    validateBody:(schema)=> {
        return (req,res,next)=>{
            const result = schema.validate(req.body)
            if(result.error){
                next(new Error(result.error.details[0].message))
            } else {
                next()
            }
        }
    },
    validateParam:(schema,name)=>{
        return (req,res,next)=>{
            let obj = {}
            obj[`${name}`] = req.params[`${name}`]
            
            let result = schema.validate(obj)
            
            if(result.error){
                next(new Error(result.error.details[0].message))
            } else {
                next()
            }
            
        }
    },
    validateToken: async(req,res,next)=>{
        let token = req.headers.authorization
        console.log(token)
        if(token){
            token = token.split(" ")[1]
            let decodedData = jwt.decode(token,process.env.SECRET_KEY)
            let user = await UserDB.findById(decodedData._id)
            if(user){
                req.body['user'] = user
                next()
            } else {
                next(new Error('Tokenization error'))
            }
           
        } else {
            next(new Error('Tokenization error'))
        }
    }
}