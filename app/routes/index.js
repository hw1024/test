var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connection = require('../config/database');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: '首页' });
});

module.exports = router;
