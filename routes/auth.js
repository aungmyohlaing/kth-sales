"use strict";

const auth = require("express").Router();
var user = require("../models/user");
var CryptoJS = require("crypto-js");

auth.route("/auth").post(function (req, res) {
  var User = new user();

  user.findOne({ username: req.body.username }, function (err, user) {
    if (err) res.send(err);

    if (user !== null) {
      // let hashPwd = user.password;
      var decryptPwd = CryptoJS.AES.decrypt(req.body.password, "ENCRYPT786E").toString(CryptoJS.enc.Utf8);
     
      var comparePwd = User.validPassword(decryptPwd, user.password);
      if (comparePwd) {
        res.json(user);
      } else res.json(null);
    } else res.json(null);
  });
});

auth.route("/checkuser").post(function (req, res) {
  var userdata;
  user.findOne({ username: req.body.username }, function (err, data) {
    if (err) res(err);

    if (data !== null) {
      res.json(data);
    } else {
      /**
       * Check User Email already exist or not
       */

      user.findOne({ email: req.body.email }, function (err, data) {
        if (err) res(err);

        res.json(data);
      });
    }
  });
});

auth.route("/checkemail").post(function (req, res) {
  user.findOne({ email: req.body.email }, function (err, data) {
    if (err) res(err);

    res.json(data);
  });
});

module.exports = auth;
