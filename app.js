const Koa = require('koa')
const koajwt = require('koa-jwt')
const bodypareser = require('koa-bodyparser')
const logger = require('koa-logger')
const json = require('koa-json')
const router = require('./routes/index');
const onerror = require('koa-onerror')
const sequelize = require('./model/sequelize.js')
sequelize.sync(); //如果表不存在则 建表
// sequelize.sync({ force: true }); //如果表存在则删除表然后建表
//jwt 秘钥
const SECRET = require('./utils/jwtconfig').SECRET
const app = new Koa();
app.proxy = true
// error handler
onerror(app);



// 中间件对token进行验证
// koa-jwt 会自动解析token 并且将内容解析内容存放在 ctx.state.user
app.use(koajwt({ secret: SECRET }).unless({
  path: [/^\/user\/login/, /^\/user\/register/, /^\/article\/getAll/, /^\/article\/getArticle/, /^\/static/]  //排除login接口
}));

//处理post请求的参数
app.use(bodypareser())
app.use(json());
app.use(logger());
/* xx中间件*/
app.use(function* (next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});
//使用路由中间件  服务器只支持post  发get就405
app.use(router()) //路由装载



app.listen(3000)