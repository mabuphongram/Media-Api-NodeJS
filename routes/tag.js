const router = require('express').Router()
const controller = require('../controllers/tag')
const {saveFile} = require('../utils/gallery')
const {AllTagSchema, AllSchema} = require('../utils/schema')
const {validateParam,validateBody,validateToken}= require('../utils/validator')

router.get('/',controller.all)
router.post('/',validateToken,saveFile,validateBody(AllTagSchema.add),controller.add)

router.route('/:id')
    .get(validateParam(AllSchema.id,"id"),controller.get)
    .put(validateToken,validateParam(AllSchema.id,"id"),controller.put)
    .delete(validateToken,validateParam(AllSchema.id,"id"),controller.drop)
    

module.exports = router