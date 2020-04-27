var express = require('express')
var router = express.Router()
var UserController = require('../controllers/UserController.js')
var middleware = require('../controllers/Authenticate.js')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.post('/login', UserController.login);
router.post('/logout', middleware.checkToken, UserController.logout);


module.exports = router;
