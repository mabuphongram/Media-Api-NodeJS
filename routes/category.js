const router = require('express').Router()
const controller = require('../controllers/category')
const {saveFile} = require('../utils/gallery')
const {AddCat,AllSchema} = require('../utils/schema')
const {validateBody,validateParam,validateToken} = require('../utils/validator')

router.get('/',controller.all)
router.post('/',validateToken,saveFile,validateBody(AddCat),controller.add)

router.route('/:id')
    .get(validateParam(AllSchema.id,"id"),controller.get)
    .put(validateToken,validateParam(AllSchema.id,"id"),controller.put)
    .delete(validateToken,validateParam(AllSchema.id,"id"),controller.drop)

module.exports = router 