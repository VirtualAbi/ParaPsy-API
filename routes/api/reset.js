const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const common = require("../../common.js");

// Load User model
const User = require("../../models/User");

router.post("/", (req, res) => {
  console.log("Hello", req.body);


    let oldPassword = req.body.oldpassword;
  newPassword = req.body.newpassword;

  User.find({ password: oldPassword }).then(user => {
    if (user) {
      console.log(user);
      User.update(
        { password: oldPassword },
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
