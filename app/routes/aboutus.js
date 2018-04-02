var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connection = require('../config/database');
/* GET home page. */
router.get('/index', function (req, res, next) {
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
        res.render('aboutus/index', { title: '关于我们', header_role: 'aboutus', aboutus_role: 'index' });
    });
});
/**
     * 组织信息展示页面
     * @return boolen
     */
router.get('/organInformation', function (req, res, next) {
    res.render('aboutus/organInformation', { title: '组织信息', header_role: 'aboutus', aboutus_role: 'organInformation' });
});
/**
     * 备案信息展示页面
     * @return boolen
     */
router.get('/recordInformation', function (req, res, next) {
    res.render('aboutus/recordInformation', { title: '备案信息', header_role: 'aboutus', aboutus_role: 'recordInformation' });
});
 /**
     * 重大事项展示页面
     * @return boolen
     */
router.get('/important', function (req, res, next) {
    res.render('aboutus/important', { title: '重大事项', header_role: 'aboutus', aboutus_role: 'important' });
});
/**
     * 运营数据展示页面
     * @return boolen
     */
router.get('/platformData', function (req, res, next) {
    res.render('aboutus/platformData', { title: '运营数据', header_role: 'aboutus', aboutus_role: 'platformData' });
});
/**
     * 银行存管展示页面
     * @return boolen
     */
router.get('/bankDepository', function (req, res, next) {
    res.render('aboutus/bankDepository', { title: '银行存管', header_role: 'aboutus', aboutus_role: 'bankDepository' });
});
/**
     * 风控策略展示页面 
     * @return boolen
     */
router.get('/riskManage', function (req, res, next) {
    res.render('aboutus/riskManage', { title: '风控策略', header_role: 'aboutus', aboutus_role: 'riskManage' });
});
/**
     * 政策法规展示页面
     * @return boolen
     */
router.get('/riskEducation', function (req, res, next) {
    res.render('aboutus/riskEducation', { title: '政策法规', header_role: 'aboutus', aboutus_role: 'riskEducation' });
});
/**
     * 媒体报道展示页面
     * @return boolen
     */
router.get('/report', function (req, res, next) {
    res.render('aboutus/report', { title: '媒体报道', header_role: 'aboutus', aboutus_role: 'report' });
});

    /**
     * 合作伙伴展示页面
     * @return boolen
     */
router.get('/partner', function (req, res, next) {
    res.render('aboutus/partner', { title: '合作伙伴', header_role: 'aboutus', aboutus_role: 'partner' });
});
/**
     * 联系我们展示页面
     * @return boolen
     */
router.get('/contactWe', function (req, res, next) {
    res.locals = { header_role: 'aboutus'}
    res.render('aboutus/contactWe', { title: '联系我们', aboutus_role: 'contactWe' });
});
/**
     * 承诺函展示页面
     * @return boolen
     */
router.get('/commitment', function (req, res, next) {
    res.render('aboutus/commitment', { title: '承诺函', header_role: 'aboutus', aboutus_role: 'commitment' });
});
module.exports = router;
