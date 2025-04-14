const verifySignup = require('../middleware/verifySignUp.js');
const controller = require("../controllers/auth.controller");
const { authjwt } = require("../middleware");

// sets up routes for authentication

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignup.checkDuplicateUsernameOrEmail// posts user signup info after checking for duplicate
      //verifySignup.checkRolesExisted
    ],
    controller.signup // signs up user successfully
  );



  app.post("/api/auth/signin", controller.signin); // sign in user
  
};
