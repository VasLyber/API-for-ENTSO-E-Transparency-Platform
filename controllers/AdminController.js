const AdminController = {}
const db = require('../model/connect.js'),
      jwt    = require("jsonwebtoken"),
      config = require("./config.js"),
      bcrypt = require("bcrypt");

AdminController.findUser = (req, res) => {
    db.User.findOne({ where: { user_name: req.params.user_name } }).then(foundUser => {
          res.status(200).send(foundUser);
      });
}
AdminController.updateUser = (req, res) => {
    db.User.findOne({ where: { user_name: req.params.user_name } }).then(foundUser => {
      if (foundUser){

        if(req.body.user_name){
        console.log(req.body.user_name);
        foundUser.update({user_name: req.body.user_name});
        }

        if(req.body.user_id){
        console.log(req.body.user_id);
        foundUser.update({user_id: req.body.user_id});
        }

        if(req.body.user_quota){
        console.log(req.body.user_quota);
        foundUser.update({user_quota: req.body.user_quota});
        }

        if(req.body.password){
        console.log(req.body.password);
        foundUser.update({password: req.body.password});
        }

        if(req.body.role){
        console.log(req.body.role);
        foundUser.update({role: req.body.role});
        }

        res.status(200).send(foundUser);
      }
      else{
         res.status(400).json({signupSuccess : 'false',error : 'User does not exists'})
     }
      });
}

AdminController.AddUser = (req,res) => {
    db.User.findOne({ where: {user_name: req.body.user_name}})
    .then(foundUser => {
        if (foundUser) {
            res.status(400).json({signupSuccess : 'false',error : 'User already exists'})
        }
        else {
            newUser = {}
            newUser.user_id = req.body.user_id
            newUser.user_name = req.body.user_name
            newUser.password = bcrypt.hashSync(req.body.password, 10)
            newUser.user_quota = req.body.user_quota
            newUser.role = req.body.role
            db.User.create(newUser)
            res.status(200).json({signupSuccess : 'true', error: null})
        }
    })
}

module.exports = AdminController;
