
const Article = require('../model/modules/article')
const multiparty = require('multiparty')
const utils = require('../utils/index.js')
const fs = require('fs')
const path = require('path')
const { ctxInit, paramsTest } = require("../utils/index.js");
class ArticleController {
    async add(ctx, next) {
        let form = new multiparty.Form();
        function loadFormData() {
            return new Promise(resolve => {
                let obj = {}
                form.parse(ctx.req, function (err, fields, files) {
                    Object.keys(fields).forEach(key => {
                        obj[key] = fields[key][0]
                    })
                    const file = files.poster[0]; // 获取上传文件
                    const reader = fs.createReadStream(file.path); // 创建可读流
                    const ext = file.originalFilename.split('.')[1];
                    const fileName = Date.now() + '-' + file.originalFilename; // 获取上传文件扩展名
                    const filePath = path.join(__dirname, `../static/poster/${fileName}`)
                    // fs.writeFile(filePath, ext, function (err) {
                    //     if (err) {
                    //         throw new Error(err);
                    //     }

                    // });
                    const upStream = fs.createWriteStream(filePath); // 创建可写流
                    reader.pipe(upStream);
                    obj.src = `/static/poster/${fileName}`
                    resolve(obj)
                });
            })
        }
        let obj = await loadFormData();
        let { title, description, content, src } = obj
        console.log(obj)
        ctxInit(ctx, { title, description, content })
        paramsTest(ctx, 'title', (p) => p.length >= 2)
        paramsTest(ctx, 'description', (p) => p.length >= 2)
        paramsTest(ctx, 'content', (p) => p.length >= 2)
        if (ctx.ybw.isParamsLegal) {
            await Article.create({
                title: title,
                description: description,
                content: content,
                poster: src
            })
            ctx.body = {
                code: 200,
                success: true,
                message: ctx.ybw.successMessage
            }
        } else {
            ctx.body = {
                ybw: ctx.ybw,
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
    async getArticle(ctx, next) {
        let params = ctx.request.query
        console.log(params)
        if (params.id || params.id === 0) {
            let article = await Article.findAll({
                where: {
                    id: params.id
                }
            })
            if (article.length) {
                ctx.body = {
                    code: 200,
                    success: true,
                    results: article
                }
            } else {
                ctx.body = {
                    code: 200,
                    success: false,
                    message: '文章不存在'
                }
            }
        } else {
            ctx.body = {
                code: 200,
                success: false,
                message: 'id必传'
            }
        }
    }
}

module.exports = ArticleController