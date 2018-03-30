var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var hbsHelper = require('./utils/hbsHelper');
var commonConfig = require('./config/common_config');

var index = require('./routes/index');
var invest = require('./routes/invest');
var loan = require('./routes/loan');
var users = require('./routes/users');
var aboutus = require('./routes/aboutus');
var about = require('./routes/about');
var passport = require('./routes/passport');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', exphbs({
  layoutsDir: 'views',
  defaultLayout: 'layout',
  extname: 'html',
  helpers: hbsHelper
}));
app.set('view engine', 'html');

// 全局配置变量
app.locals = commonConfig.quantity;
//版本号
app.locals.version = new Date().getTime();
// uncomment after placing your favicon in /public
//请求网页的logo
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//显示req请求的信息
app.use(logger('dev'));
// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('sessiontest'));
//将静态文件目录设置为项目根目录+/public
app.use(express.static(path.join(__dirname, 'public')));
var identityKey = 'skey';
app.use(session({
  name: identityKey,
  secret: 'sessiontest',  // 用来对session id相关的cookie进行签名
  store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: null  // 有效期，单位是毫秒
  }
}));
app.use('/', index);
app.use('/invest', invest);
app.use('/loan', loan);
app.use('/users', users);
app.use('/aboutus', aboutus);
app.use('/about', about);
app.use('/passport', passport);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
