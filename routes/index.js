var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // business logic here
  // for example fetch data from our backend
  // prepare data for our html website
  res.render('index', { title: 'This is example form Yuchen' });
});

module.exports = router;
