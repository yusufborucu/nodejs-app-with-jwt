const jwt = require('jsonwebtoken');
const Cookies = require('cookies');

module.exports = (req, res, next) => {
  const cookies = new Cookies(req, res);

  if (cookies.get('x-access-token')) {
    req.headers['x-access-token'] = cookies.get('x-access-token');
  }

  const token = req.headers['x-access-token'] || req.body.token || req.query.token;

  if (token) {
    jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
      if (err) {
        res.render('error', {error: {status: 'Token hatalı.'}, message: 'Fail Token'});
      } else {
        req.decode = decoded;
        next();
      }
    });
  } else {
    res.render('error', {error: {status: 'Giriş yapmadan bu sayfayı göremezsiniz.'}, message: 'No Token'});
  }
};