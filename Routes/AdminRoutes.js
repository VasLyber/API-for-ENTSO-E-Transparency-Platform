var express = require('express')
var router = express.Router()
var AdminController = require('../controllers/AdminController.js')
var middleware = require('../controllers/Authenticate.js')
var adminauth = require('../controllers/adminAuthorization.js')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/:user_name', middleware.checkToken, adminauth.adminAuth , AdminController.findUser);
router.put('/:user_name', middleware.checkToken, adminauth.adminAuth , AdminController.updateUser);
router.post('/', middleware.checkToken , adminauth.adminAuth ,AdminController.AddUser)
module.exports = router;
