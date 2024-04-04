const router = require('express').Router();
const controller = require('../controllers/post');
const {validateToken,validateBody, validateParam} = require('../utils/validator')
const {PostSchema, AllSchema} = require('../utils/schema')
const  {saveFile}= require('../utils/gallery')

router.get('/', controller.all)

router.post('/',[validateToken,saveFile,validateBody(PostSchema),controller.post])

router.get('/byCat/:id',controller.byCat)

router.get('/byTag/:id',controller.byTag)

router.get('/paginate/:page',[validateParam(AllSchema.page,"page"),controller.paginate])

router.get('/like/toggle/:id/:page',validateParam(AllSchema.id,'id'),controller.toggle)

router.get('/byUser/:id',controller.byUser)

router.route('/:id')
    .get(controller.get)
    .put(validateToken,controller.put)
    .delete(validateToken,controller.drop)


module.exports = router;