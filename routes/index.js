var globalConstant = require('../variables')
var express = require('express');
const axios = require('axios').default;
var router = express.Router();

const auth = (req, res, next) => {
   
    if (!req.cookies) {
        res.render('login', { title: '' });
        return
    }

    // We can obtain the session token from the requests cookies, which come with every request
    const sessionToken = req.cookies['session_token']
    if (!sessionToken) {
        // If the cookie is not set, return an unauthorized status
        res.redirect(307, "/login");
        return
    }

    // We then get the session of the user from our session map
    // that we set in the signinHandler
    userSession = sessions[sessionToken]
    if (!userSession) {
        // If the session token is not present in session map, return an unauthorized error
        res.redirect(307, "/login");
        return
    }
    // if the session has expired, return an unauthorized error, and delete the 
    // session from our map
    if (userSession.isExpired()) {
        delete sessions[sessionToken]
        res.redirect(307, "/login");
        return
    }

  next()
}

/* GET home page. */
router.get('/', auth, function(req, res, next) {
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

router.get('/cart', function(req, res, next) {
  // business logic here
  // for example fetch data from our backend
  // prepare data for our html website
  res.render('cart', { title: 'This is example form Yuchen' });
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

router.get('/shop', async function(req, res, next) {
  // user profile
  axios.get(globalConstant.backendApi+'/products')
  .then(function (response) {
    console.log(response.data);
    res.render('shop', {data: response.data.data});
  });
});


router.get('/shop/:id', auth, async function(req, res, next) {
  // user profile
  const id = req.params.id;
  axios.get(globalConstant.backendApi+'/products/'+id)
  .then(function (response) {
    //console.log(req.cookies['session_token'])
    cart[req.cookies['session_token']]+=response.data.data;
  });
});

router.get('/login', function(req, res, next) {
  // login-page
  // console.log('this is token',token)
  res.render('login', { title: '' });
});

router.get('/history', function(req, res, next) {
  // history
  res.render('orderhistory', { title: 'This is example form Yuchen' });
});

router.post('/login', async function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  //console.log('req body',req.body)
  //test data
  const data = {
    "email": "annikat.harmsen1000@gmail.com",
    "password": "secure123"
  }

  try {
      response = await axios.post(globalConstant.backendApi+'/login', data)
      console.log('response is here' ,response.data.data)
      if (response.data.data) { 
        let token = response.data.data.token;
        let user = response.data.data.user;
        //console.log(response.data)
        signinHandler(res,  user, token)
        res.render('/', { title: '' });
      }
      res.render('/login', { title: 'wrong input' });
    } catch (error) {
      console.log(error);
      res.render('login', { title: 'error' });
  }

});

router.post('/users', async function(req, res, next) { 
  var email = req.body.email;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  //console.log('req body',req.body)
  //test data
  const data = {
    "email": email,
    "password": password,
    "firstname": firstname,
    "lastname": lastname
  }

  try {
      response = await axios.post(globalConstant.backendApi+'/register', data)
      console.log('registering' ,response.data.data)
      if (response.data.data.success){
        res.render('/login', { title: '' });
      }
      res.render('/users', { title: 'wrong input' });
    } catch (error) {
      console.log(error);
      res.render('login', { title: 'error' });
  }
});

class Session {
    constructor(username, expiresAt, hashedToken) {
        this.username = username
        this.expiresAt = expiresAt
        this.token = hashedToken
    }

		// we'll use this method later to determine if the session has expired
    isExpired() {
        this.expiresAt < (new Date())
    }
}

// this object stores the users sessions. For larger scale applications, you can use a database or cache for this purpose
const sessions = {}
const cart = {}

const signinHandler = (res,username,token) => {

    const sessionToken = token

    const now = new Date()
    const expiresAt = new Date(+now + 520 * 1000)

    // create a session containing information about the user and expiry time
    const session = new Session(username,token,expiresAt)
    // add the session information to the sessions map
    sessions[sessionToken] = session

    console.log("cookie of session",sessions)
    // In the response, set a cookie on the client with the name "session_cookie"
    // and the value as the UUID we generated. We also set the expiry time
    res.cookie("session_token", sessionToken, { expires: expiresAt })
    res.end()
}


module.exports = router;
