var express = require('express');
const axios = require('axios').default;
var router = express.Router();

var token = ""
var user = {}
/* GET home page. */
router.get('/', function(req, res, next) {
  // business logic here
  // for example fetch data from our backend
  // prepare data for our html website
  res.render('index', { title: 'This is example form Yuchen' });
});

router.get('/checkout', function(req, res, next) {
  // business logic here
  // for example fetch data from our backend
  // prepare data for our html website
  res.render('checkout', { title: 'This is example form Yuchen' });
});

router.get('/contact', function(req, res, next) {
  // business logic here
  // for example fetch data from our backend
  // prepare data for our html website
  res.render('contact', { title: 'This is example form Yuchen' });
});

router.get('/users', function(req, res, next) {
  // user profile
  res.render('signup', { title: 'This is example form Yuchen' });
});

router.get('/login', async function(req, res, next) {
  // login-page
  console.log('this is token',token)
  res.render('login', { title: '' });
});

router.get('/history', function(req, res, next) {
  // history
  res.render('orderhistory', { title: 'This is example form Yuchen' });
});

router.get('/login-api', async function(req, res, next) {
  // backend call for login
  const data = {
    "email": "annikat.harmsen1000@gmail.com",
    "password": "secure123"
  }
  try {
      response = await axios.post('http://localhost:8000/api/login', data)
      console.log(response.data)
      if (response.data = true) {
        token = response.data.data.token;
        user = response.data.data.user;
        console.log(response.data.data)
        res.render('index', { title: '' });
      }
      res.render('login', { title: 'wrong input' });
    } catch (error) {
      console.log(error);
      res.render('login', { title: 'error' });
  }
});



module.exports = router;
