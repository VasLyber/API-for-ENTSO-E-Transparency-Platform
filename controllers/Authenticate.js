let jwt = require('jsonwebtoken');
const config = require('./config.js');
const db = require('../model/connect.js');

let checkToken = (req, res, next) => {
  let token = req.headers['x-observatory-auth']

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    req.token = token;
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      else {
         db.User.findOne({ where: { user_id: decoded.id } }).then(foundUser => {
           req.user_id = foundUser.user_id;
           switch(foundUser.role) {
            case 'Admin':
              req.admin = 1;
              next();
              break;
            case 'User':
              req.admin = 0;
              next();
              break;
            default:
              return res.status(500).send({ auth: false, message: 'User role is not initialized' });
            }
      });
  }
});
}
  else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}
