const md5 = require('md5')

exports.MD5 = function (val, solt = "ybw") {
    return md5(md5(val) + solt)
}
