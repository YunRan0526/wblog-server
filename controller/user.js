const jsonwebtoken = require("jsonwebtoken")
const Users = require('../model/modules/user')
const SECRET = require('../utils/jwtconfig').SECRET
const { Op } = require("sequelize");
const { ctxInit,paramsTest } = require("../utils/index.js");
class UserController {

    async register(ctx, next) {
        ctxInit(ctx);
        let { params } = ctx.ybw
        paramsTest(ctx, 'username', /[\.@a-zA-Z\d\u4e00-\u9fa5]{2,8}/)
        //账号 密码长度在6-16
        paramsTest(ctx, 'account', /[a-zA-Z0-9\.@]{6,16}/g)
        paramsTest(ctx, 'password', /[a-zA-Z0-9\.@]{6,16}/g)
        if (ctx.ybw.isParamsLegal) {
            let res = await Users.findAll({
                where: {
                    [Op.or]: [
                        { account: params.account },
                        { username: params.username }
                    ]
                }
            })
            if (res.length) {
                ctx.body = {
                    code: 200,
                    success: false,
                    message: '该账号或用户名已存在'
                }
            } else {
                await Users.create({
                    username: params.username || null,
                    account: params.account || null,
                    password: params.password || null
                })
                ctx.body = {
                    username: params.username || null,
                    account: params.account || null,
                    password: params.password || null,
                    code: 200,
                    success: true,
                    message: ctx.ybw.successMessage
                }
            }
        } else {
            ctx.body = {
                code: 200,
                success: false,
                message: ctx.ybw.errorMessage
            }
        }
    }
    async login(ctx, next) {
        ctxInit(ctx);
        //账号 密码长度在6-16
        paramsTest(ctx, 'account', /[a-zA-Z0-9\.@]{6,16}/g)
        paramsTest(ctx, 'password', /[a-zA-Z0-9\.@]{6,16}/g)
        let { params } = ctx.ybw
        if (ctx.ybw.isParamsLegal) {
            let user = await Users.findAll({
                where: {
                    account: params.account,
                    password: params.password
                }
            })
            if (user.length) {
                ctx.body = {
                    code: 200,
                    success: true,
                    message: '登录成功',
                    token: jsonwebtoken.sign(
                        {
                            account: user[0].account,
                            password: user[0].password,
                        },
                        SECRET,
                        { expiresIn: '1h' } // 有效期1小时

                    )
                }
            } else {
                ctx.body = {
                    code: 200,
                    success: false,
                    message: '账号或密码错误',
                }
            }
        } else {
            ctx.body = {
                code: 200,
                success: false,
                message: ctx.ybw.errorMessage
            }
        }

    }
    async getAll(ctx, next) {
        let results = await Users.findAll()
        ctx.body = {
            results,
            code: 200,
            success: true,
            message: '查询成功'
        }
    }
}

module.exports = UserController