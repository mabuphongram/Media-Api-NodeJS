const router = require('express').Router()
const { valid } = require('joi')
const controller = require('../controllers/comment')
const {AllSchema,CommentSchema} = require('../utils/schema')
const {validateParam,validateBody,validateToken}= require('../utils/validator')

router.post('/',[validateBody(CommentSchema),controller.add])
router.delete('/:id',[validateToken,controller.drop])
router.get('/:id',controller.get)

module.exports = router