var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var connection = require('../config/database');
var filter = require('../config/filter');
/* GET home page. */
router.get('/index', filter.authorize, function(req, res, next) {
	var modSql = 'SELECT * FROM websites';
	connection.query(modSql,function (err, result) {
	  res.render('contract/index', {title: '产品列表',result: result});
	});
});

router.get('/add', filter.authorize, function(req, res, next) {
  res.render('contract/add', { title: '产品添加' });
});

router.get('/edit/:id', filter.authorize, function(req, res, next) {
	var  modSql = 'SELECT * FROM websites where Id= ?';
	var  modSqlParams = [req.params.id];
	connection.query(modSql,modSqlParams,function (err, result) {
		console.log(result);
	  res.render('contract/edit', {title: '产品修改',result: result});
	});
});

router.get('/detail/:id', filter.authorize, function(req, res, next) {
	var  modSql = 'SELECT * FROM websites where Id= ?';
	var  modSqlParams = [req.params.id];
	connection.query(modSql,modSqlParams,function (err, result) {
	  res.render('contract/detail', {title: '产品详情',result: result});
	});
});
/*插入数据 */
router.post('/process_add', urlencodedParser, function (req, res) {
	var  addSql = 'INSERT INTO websites(Id,type,name,rate,date,price,status) VALUES(0,?,?,?,?,?,?)';
	var  addSqlParams = [req.body.type, req.body.name, req.body.rate, req.body.date, req.body.price, req.body.status];
	connection.query(addSql,addSqlParams,function (err, result) {
		res.json({code: 200, message: '成功'});
	   	res.end(JSON.stringify(result));
	});
})
/*更新数据 */
router.post('/process_updata', urlencodedParser, function (req, res) {
	var  modSql = 'UPDATE websites SET type = ?,name = ?,rate = ?,date = ?,price = ?,status = ? WHERE Id = ?';
	var  modSqlParams = [req.body.type, req.body.name, req.body.rate, req.body.date, req.body.price, req.body.status, req.body.id];
	connection.query(modSql,modSqlParams,function (err, result) {
		res.json({code: 200, message: '成功'});
	   	res.end(JSON.stringify(result));
	});
})
/*删除数据 */
router.post('/process_del', urlencodedParser, function (req, res) {
	var  delSql = 'DELETE FROM websites where Id= ?';
	var  delSqlParams = [req.body.id];
	connection.query(delSql,delSqlParams,function (err, result) {
		res.json({code: 200, message: '成功'});
	   	res.end(JSON.stringify(result));
	});
})


module.exports = router;
