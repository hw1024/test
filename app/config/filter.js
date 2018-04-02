
exports.authorize = function(req, res, next) {
  var originalUrl = req.originalUrl;
  if (!req.session.loginUser) {
    res.redirect(`/passport/login?redir=${originalUrl}`);
  } else {
    next();
    
  }
}