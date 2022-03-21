let Router = require('koa-router');
let UserController = require('../controller/user')
let controller = new UserController()
const router = new Router({ prefix: '/user' });

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/getAll',controller.getAll)
module.exports = router
