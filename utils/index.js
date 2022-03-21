
module.exports = {
    pageLimit: (ctx) => {
        return {
            limit: ctx.query.pageSize ? ctx.query.pageSize : 10,
            offset: ((ctx.query.pageNum ? ctx.query.pageNum : 1) - 1) * (ctx.query.pageSize ? ctx.query.pageSize : 10)
        }
    },
    paramsTest: (ctx, key, reg, msg) => {
        if (!msg) msg = `${key} 不合法`
        const funcHandler = (params) => {
            if (!ctx.ybw.params[key]) {
                msg = `${key} 缺少`
                errorHandler()
                return
            }
            if (!reg(params)) errorHandler()
        }
        const regHandle = (params) => {
            if (!ctx.ybw.params[key]) {
                msg = `${key} 缺少`
                errorHandler()
                return
            }
            if (!reg.test(params)) errorHandler()
        }
        const errorHandler = () => {
            ctx.ybw.isParamsLegal ? ctx.ybw.isParamsLegal = false : ""
            ctx.ybw.errorMessage.push(msg)
        }
        const error = () => {
            throw new Error('reg 参数必须是函数或者正则')
        }
        reg.constructor === Function ? funcHandler(ctx.ybw.params[key])
            : reg.constructor === RegExp ? regHandle(ctx.ybw.params[key])
                : error()
    },
    ctxInit: (ctx, params) => {
        ctx.ybw = {
            params: !!params ? params : (ctx.request.method === 'POST' ? ctx.request.body : ctx.request.query),
            isParamsLegal: true,
            successMessage: "请求成功",
            errorMessage: []
        }
    }
}