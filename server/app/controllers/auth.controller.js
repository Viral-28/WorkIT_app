const config = require("../config/auth.config");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user } = require("../models");
const User = db.user;
const Post = db.post;





// creates new user in database
exports.signup = (req, res) => {
  const user = new User({
    userName: req.body.userName, // requests username
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    emailId: req.body.emailId, // requests email
    phoneNo:req.body.phoneNo,
    password: bcrypt.hashSync(req.body.password, 8) // requests hidden password
  });

  user.save((err, user) => {
    if (err) { // error message
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
    
  });
};

// signin function for user
exports.signin = (req, res) => {
  User.findOne({ // searches for username in database
    emailId: req.body.emailId
  })
   // .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) { // error message if username does not exist
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // denies accesstoken if password is invalid
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      // generates token using jsonwebtoken
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      // returns user information and access token
      res.status(200).send({
        id: user._id,
        firstName: user.firstName,
        emailId: user.emailId,
        accessToken: token,
        userName: user.userName
      });
    });
};


