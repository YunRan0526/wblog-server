let user = require('./user')
let article = require('./article')
let static = require('./static')
//使用 koa-combine-routers  合并router


let combineRoutes = require('koa-combine-routers')

module.exports = combineRoutes(user, article, static)