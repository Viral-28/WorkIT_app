const { authjwt } = require("../middleware");
const controller = require("../controllers/user.controller");


// sets up routes for authorization 
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess); // authorization for public access

  app.get("/api/test/user", [authjwt.verifyToken], controller.userBoard); // authorization for logged in users

  app.get(
    "/api/test/admin", // authorization for admin users
    [authjwt.verifyToken, authjwt.isAdmin],
    controller.adminBoard
  );
};