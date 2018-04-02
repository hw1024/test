/**
 * @type class BaseModel
 * @author hw
 * @time 2018-03-02
 * @desc desc base_model.js
 */
var mysql = require('mysql'),
    Util = require('../utils/util'),
    dbClient;
module.exports = function () {
    _constructor(); //调用自身的构造函数，其方法在本函数中定义
    /* 数据库查询接口 */
    this.fineAllData = function (tableName, callback) {
        dbClient.query('SELECT * FROM ' + tableName, function (error, results) {
            /* 回调处理MySQL连接结果 */
            if (error) {
                console.log('GetData Error: ' + error.message);
                dbClient.end()
                callback(false);
            } else {
                callback(results);
            }
        });
    }
    /* 数据库查询接口 */
    this.fineOneById = function (tableName, idJson, callback) {
        dbClient.query('SELECT * FROM ' + tableName + ' where ?', idJson,  function (error, results) {
            /* 回调处理MySQL连接结果 */
            if (error) {
                console.log('GetData Error: ' + error.message);
                dbClient.end()
                callback(false);
            } else {
                if (results) {
                    callback(results.pop());
                } else {
                    callback(results);
                }               
            }
        });
    }
    /* 数据库插入接口 */
    this.insert = function (tableNmae, rowInfo, callback) {
        dbClient.query('INSERT * INTO ' + tableName + ' SET ? ', rowInfo, function (error, results) {
            if (error) throw error
            callback(results.insertId);
        });
    }
    /* 数据库修改接口 */
    this.modify = function (tableNmae, idJson, rowInfo, callback) {
        dbClient.query('update ' + tableName + ' SET ? where ?', [rowInfo, idJson], function (error, results) {
            if (error) {
                console.log('ClientResady Error: ' + error.message)
                dbClient.end()
                callback(false);
            } else {
                callback(true);
            }
            
        });
    }
    /* 数据库删除接口 */
    this.remove = function (table, idJson, callback) {
        dbClient.query('delete from ' + tableName + ' where ?', idJson, function (error, results) {
            if (error) {
                console.log('ClientResady Error: ' + error.message)
                callback(false);
            } else {
                callback(results);
            }

        });
    }
    /* 数据库条件查询接口 */
    this.find = function (table, whereJson, orderByJson, limitArr, fieldsArr, callback) {
    }
    function _constructor() {
        var dbConfig = Util.get('./config/config.json', 'db'); //读取config.json配置文件，并获取其中db的配置文件信息
        /* 获取MySQL配置信息 */
        client = {};
        /* 读取配置文件中MySQL的host值 */
        client.host = dbConfig['host'];
        /* 读取配置文件中MySQL的port端口 */
        client.port = dbConfig['port'];
        /* 读取配置文件中MySQL的数据库的用户名 */
        client.user = dbConfig['user'];
        /* 读取配置文件中MySQL的数据库的密码 */
        client.password = dbConfig['password'];
        /* 读取配置文件中MySQL的数据库名 */
        client.database = dbConfig['database'];

        /* 根据配置文件，创建MySQL连接 */
        dbClient = mysql.createConnection(client); //创建MySQL服务器连接对象
        dbClient.connect(); //连接MySQL服务器
        /* 执行MySQL指令，连接MySQL服务器的一个数据库 */
        dbClient.query('SELECT * FROM ' + dbConfig['dbName'], function(error, results) {
            /* 回调处理MySQL连接结果 */
            if (error) {
                console.log('ClientConnectionReady Error: ' + error.message);
                dbClient.end()
            }
            console.log('connection local mysql success');
        }) 
    }
    
}