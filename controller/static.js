const path = require('path')
const fs = require('fs')
const mime = require('mime-types'); //需npm安装
class StaticController {
    async posterHandle(ctx, next) {
        const fileName = ctx.params.filename
        const filePath = path.join(__dirname, `../static/poster/${fileName}`)
        // fs.readFile('.' + urls, function (err, data) {
        //     if (err) console.log(err)
        //     res.write(data)
        //     res.end()
        // });
        let mimeType = mime.lookup(filePath); //读取图片文件类型
        ctx.set('content-type', mimeType);
        const file = fs.createReadStream(filePath); // 创建可读流
        ctx.body = file
    }
}

module.exports = StaticController