let Router = require('koa-router');
let StaticController = require('../controller/static')
let controller = new StaticController()
const router = new Router({ prefix: '/static' });

router.get('/poster/:filename', controller.posterHandle)
module.exports = router