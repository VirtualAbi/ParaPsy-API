const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const mongodb = require("mongodb");
const common = require("../../common.js");

// Load User model
const User = require("../../models/User");

router.post("/", (req, res) => {
  console.log("Hello", req.body);


  var uid = new mongodb.ObjectId(req.body.userid);
  newPassword = req.body.newpassword;

  User.find({ _id: uid }).then(user => {
    if (user) {
      console.log(user);
      User.update(
        { _id: uid },
        { $set: { password: newPassword } },
        (err, result) => {
          if (!err) {
            res.status(200).json(
              common.formatResponse({
                type: "PasswordChanged",
                code: 'PASSWORD_CHANGED'
              })
            );
          } else {
            console.log(err);
          }
        }
      );
    }
  });
});

module.exports = router;
