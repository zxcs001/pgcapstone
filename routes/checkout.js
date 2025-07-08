var express = require('express');
var router = express.Router();

/* GET checkout page. */
router.get('/checkout', function(req, res, next) {
  // business logic here
  // for example fetch data from our backend
  // prepare data for our html website
  res.render('checkout', { title: 'This is example form Yuchen' });
});

module.exports = router;
