var express = require('express')
var router = express.Router()
var multer = require("multer");
var middleware = require('../controllers/Authenticate.js')
var authorization = require('../controllers/adminAuthorization.js')
var AdminDatabaseController = require('../controllers/AdminDatabaseController')


router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './controllers/filesUpload')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage })

router.post('/:table', middleware.checkToken, authorization.adminAuth, AdminDatabaseController.importData);


module.exports = router;
