var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var BaseModel = require('../config/base_model');
var baseModel = new BaseModel();
/* GET home page. */
router.get('/lister', function (req, res, next) {
    res.render('invest/lister', { title: '我要出借', header_role: 'invest' });
});
router.post('/ajax_list', function (req, res, next) {
    var endRow,
        firstPage,
        hasNextPag,
        hasPrePage,
        lastPage,
        limit = 10,
        nextPage,
        offset,
        page = Number(req.body.page),
        prePage,
        totalCount,
        totalPages;
    var tableName = 'hj_borrow';
    var whereJson = {
        'and': [{ 'key': 'id', 'opts': '>', 'value': 1}],
        'or': [{ 'key': 'id', 'opts': '<', 'value': 10000 }]
    };
    var orderByJson = { 'key': 'id','type': 'asc'};
    var fieldsArr = [];
    var limitArr = [((page-1)*limit), limit];
    baseModel.fineCount(tableName, function (rows) {
        totalCount = rows[0].total;
        totalPages = Math.ceil(totalCount / limit);
        endRow = page * limit;
        nextPage = page + 1;
        offset = (page - 1) * limit;
        if (page == 1) {
            firstPage = true;
            hasNextPage = true;
            hasPrePage = false;
            lastPage = false;
            prePage = 1
        } else if (page == totalPages) {
            firstPage = false;
            hasNextPage = false;
            hasPrePage = true;
            lastPage = true;
            prePage = page - 1;
            endRow = totalCount;
        } else {
            firstPage = false;
            hasNextPage = true;
            hasPrePage = true;
            lastPage = false;
            prePage = page - 1
        }
        if (totalCount == 0) endRow = 0;
    })
    baseModel.find(tableName, whereJson, orderByJson, limitArr, fieldsArr, function (result) {
        value = {
            pageBean: result,
            page: {
                endRow: endRow,
                firstPage: firstPage,
                hasNextPage: hasNextPage,
                hasPrePage: hasPrePage,
                lastPage: lastPage,
                limit: limit,
                nextPage: nextPage,
                offset: offset,
                page: page,
                prePage: prePage,
                totalCount: totalCount,
                totalPages: totalPages
            }
        }
        res.json({
            code: 200, message: '成功', ok: true, value: value
        });
    })
});

module.exports = router;
