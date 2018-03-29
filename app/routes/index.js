var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connection = require('../config/database');
var filter = require('../config/filter');

/* GET home page. */
router.get('/', filter.authorize, function (req, res, next) {
    var modSql = 'SELECT * FROM websites';
    connection.query(modSql, function (err, result) {
        res.locals = {
            result: result,
            time: '2018-03-28 23:59:59',
            avg_each: '111509.73',
            avg_borrow: '111842.93',
            borrow_num: '1004',
            borrow_array1: '1000.00',
            borrow_array2: '10.01',
            borrow_array3: '100.30'
        }
        res.render('index', { title: '首页' });
    });
});

module.exports = router;
