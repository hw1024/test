
exports.authorize = function(req, res, next) {
	console.log(req.session.loginUser)
  if (!req.session.loginUser) {
    res.redirect('/passport/login');
  } else {
    next();
  }
}