const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Cookies = require('cookies');

// Models
const User = require('../models/User');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    email
  }, (err, user) => {
    if (err)
      throw err;

    if (!user) {
      res.send('Kullanıcı bulunamadı.');
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.send('Parola yanlış.');
        } else {
          const payload = {
            email
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720
          });

          const cookies = new Cookies(req, res);
          cookies.set("x-access-token", token, {httpOnly: true}); //secure: true
          res.send('1');
        }
      });
    }
  });

});

module.exports = router;