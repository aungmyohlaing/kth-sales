"use strict";

const users = require("express").Router();
var user = require("../models/user");

/**
 * User Api Routes
 */
users
  .route("/users")
  .get(function (req, res) {
    user.aggregate(
      [
        {
          $project: {
            fullname: "$fullname",
            username: "$username",
            email: "$email",
            userType: "$userType",
          },
        },
      ],
      function (err, data) {
        if (err) res.send(err);

        res.json(data);
      }
    );
  })
  .post(function (req, res) {
    var User = new user();
    var hashpwd = User.generateHash(req.body.password);

    User.fullname = req.body.fullname;
    User.email = req.body.email;
    User.username = req.body.username;
    User.password = hashpwd;
    User.userType = req.body.userType;
    User.createDate = req.body.createDate;

    User.save(function (err) {
      if (err) res.send(err);
      res.json({ message: "Successfully added!" });
    });
  })
  .delete(function (req, res) {
    user.deleteOne({ _id: req.body.userid }, function (err, data) {
      if (err) res.send(err);

      res.json({ message: "Successfully delete!" });
    });
  });

users.route("/users/noteq").post(function (req, res) {
  user.find({ _id: { $ne: req.body.id } }, function (err, users) {
    if (err) res.send(err);

    res.json(users);
  });
});

module.exports = users;
