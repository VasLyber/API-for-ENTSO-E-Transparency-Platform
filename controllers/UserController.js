const UserController = {}
const db = require('../model/connect.js'),
      jwt    = require("jsonwebtoken"),
      config = require("./config.js"),
      bcrypt = require("bcrypt");

UserController.login = (req, res) => {
    db.User.findOne({ where: { user_name: req.body.user_name } }).then(foundUser => {
        if (foundUser) {
             bcrypt.compare(req.body.password, foundUser.password, (err, result) =>{
              if (err) throw err;
              if (result === true) {
                        var token = jwt.sign({ id: foundUser.user_id }, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        res.status(200).send({ auth: true, token: token });
              }
              else {
                    res.status(401).send({ auth:false, token: null});
              }
              });
          }
          else {
            res.status(401).send({ auth:false, token: null});
          }
      });
}

UserController.logout = (req, res) => {

          db.User.findOne({ where: { user_id: req.user_id } }).then(foundUser => {
          res.status(200).send({token: req.token, message: foundUser.user_name+', you are logged out'})
        });

}

module.exports = UserController;
