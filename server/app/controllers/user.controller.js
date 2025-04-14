const db = require("../models");


exports.allAccess = (req, res) => { // for public access
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => { // for logged in user access
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => { // for admin users
  res.status(200).send("Admin Content.");
};

exports.update = function (req, res) {
  var id = parseInt(req.params.id);
  var updatedCustomer = req.body;
  if (customers["customer" + id] != null) {
    // update data
    customers["customer" + id] = updatedCustomer;

    console.log("--->Update Successfully, customers: \n" + JSON.stringify(customers, null, 4))

    // return
    res.end("Update Successfully! \n" + JSON.stringify(updatedUser, null, 4));
  } else {
    res.end("Don't Exist Customer:\n:" + JSON.stringify(updatedCustomer, null, 4));
  }
};