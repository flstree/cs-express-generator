var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const url = "https://obzeva.com";
  res.redirect(302, url);
});

module.exports = router;
