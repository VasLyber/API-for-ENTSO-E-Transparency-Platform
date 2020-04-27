var express = require('express'),
 router = express.Router();

router.use('/', require('./UserRoutes.js'));
router.use('/Admin/users', require('./AdminRoutes.js'))
router.use('/Admin/', require('./AdminDatabaseRoutes.js'))


module.exports = router;
