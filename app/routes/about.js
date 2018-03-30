var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var connection = require('../config/database');
var filter = require('../config/filter');
/* GET home page. */

router.get('/problem', function (req, res, next) {
    res.render('about/problem', { title: '帮助中心' });
});

module.exports = router;
