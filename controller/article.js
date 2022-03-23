
const Article = require('../model/modules/article')
const utils = require('../utils/index.js')
const { ctxInit, paramsTest } = require("../utils/index.js");
class ArticleController {
    async add(ctx, next) {
        ctxInit(ctx)
        let { params } = ctx.ybw
        paramsTest(ctx, 'title', (p) => p.length >= 2)
        paramsTest(ctx, 'description', (p) => p.length >= 2)
        paramsTest(ctx, 'content', (p) => p.length >= 2)
        if (ctx.ybw.isParamsLegal) {
            await Article.create({
                title: params.title,
                description: params.description,
                poster: params.poster,
                content: params.content
            })
            ctx.body = {
                code: 200,
                success: true,
                message: ctx.ybw.successMessage
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
        let results = await Article.findAll();
        /* get请求通过 ctx.request.query  获取请求参数*/
        ctx.body = {
            results,
            code: 200,
            success: true,
            message: '请求成功'
        }
    }
    async delete(ctx, next) {
        ctxInit(ctx)
        let { params } = ctx.ybw
        paramsTest(ctx, 'id', (p) => true)
        if (ctx.ybw.isParamsLegal) {
            let article = await Article.findAll({
                where: {
                    id: params.id
                }
            })
            if (article.length) {
                await Article.destroy({
                    where: {
                        id: article[0].id
                    }
                })
                ctx.body = {
                    code: 200,
                    success: true,
                    message: ctx.ybw.successMessage
                }
            } else {
                ctx.body = {
                    code: 200,
                    success: true,
                    message: '文章不存在'
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

}

module.exports = ArticleController