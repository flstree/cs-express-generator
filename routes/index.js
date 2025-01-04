var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const query = req.query;
  res.render('success', { query: JSON.stringify(query) });
});

module.exports = router;
