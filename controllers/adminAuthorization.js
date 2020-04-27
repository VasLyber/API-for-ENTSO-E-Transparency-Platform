let jwt = require('jsonwebtoken');
const config = require('./config.js');
const db = require('../model/connect.js');

let adminAuth = (req, res, next) => {
  if (req.admin == 0){
    console.log(req.admin);
    return res.status(401).send({ auth: false, message: 'Not Authorized User' });
  } next();
};

module.exports = {
  adminAuth: adminAuth
}
