/**
 * @type module
 * @author hw
 * @time 2018-03-02
 * @desc desc util.js
 */
var fs = require('fs'),
    sys = require('util');
exports.get = function (fileName, key) {
    var configJson = {};
    try{
        var str = fs.readFileSync(fileName, 'utf-8'); //以 utf8 格式同步读取配置文件信息
        configJson = JSON.parse(str); //使用JSON的parse方法解析都区后的配置文件内容转为json对象
    }catch(e) {
        sys.debug('JSON parse fails')
    }
    return configJson[key] //返回需要的key值配置信息
}