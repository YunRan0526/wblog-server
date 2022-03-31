let Router = require('koa-router');
let ArticleController = require('../controller/article')
let controller = new ArticleController()
const router = new Router({ prefix: '/article' });

router.post('/add', controller.add)
router.get('/getAll', controller.getAll)
router.post('/delete', controller.delete)
router.get('/getArticle', controller.getArticle)
module.exports = router