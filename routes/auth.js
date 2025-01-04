var express = require('express');
var router = express.Router();


router.post('/login', function(req, res, next) {
  const body = req.body;
  res.send({ message: 'successful', status: true, data: { email: body.email, accessToken: 'sshsdhjsdhjs'}});
});

module.exports = router;