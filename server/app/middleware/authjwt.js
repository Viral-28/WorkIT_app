const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");

const User = db.user;
const Role = db.role;

// sets token
verifyToken = (req, res, next) => {

  console.log("ssdf"+req.headers.authorization);
  console.log("ssdf"+req.headers);
  let token = req.headers.authorization.split(" ")[1];

  // if no token has been created
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  // checks token authorization
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

// isAdmin = (req, res, next) => {
//   User.findById(req.userId).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     Role.find(
//       {
//         _id: { $in: user.roles }
//       },
//       (err, roles) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }

//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "admin") {
//             next();
//             return;
//           }
//         }

//         res.status(403).send({ message: "Require Admin Role!" });
//         return;
//       }
//     );
//   });
// };

const authjwt = {
  verifyToken
};

module.exports = authjwt;