var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      email,
      password: hash
    });

    const promise = user.save();
    promise.then((data) => {
      res.send('Kayıt başarılı.');
    }).catch((err) => {
      res.send('Hata.');
    });
  });

});

module.exports = router;