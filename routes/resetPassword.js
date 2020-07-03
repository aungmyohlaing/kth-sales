"use strict";
const resetPassword = require("express").Router();
var user = require("../models/user");

resetPassword.route("/resetpassword").put(function (req, res) {
  var User = new user();
  var hashpwd = User.generateHash(req.body.password);

  user.findOne({ email: req.body.email }, function (err, data) {
    if (err) res.send(err);

    User.password = hashpwd;
    User.save(function (err) {
      if (err) res.send(err);

      res.json({ message: "Password Successfully Updated!" });
    });
  });
});


module.exports = resetPassword;