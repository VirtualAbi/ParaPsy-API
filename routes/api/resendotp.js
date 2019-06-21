const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const mongodb = require("mongodb");
const common = require("../../common.js");
const validateOtpInput = require("../../validation/otpval");

// Load User model
const User = require("../../models/User");

router.post("/", (req, res) => {
  console.log("Hello", req.body);

  let newOTP = common.generateOTP();
  let uid = new mongodb.ObjectId(req.body.userid);

  User.find({ _id: uid }).then(user => {
    if (user) {
      console.log(user);
      User.update({ _id: uid }, { $set: { otp: newOTP } }, (err, result) => {
        if (!err) {
          res.status(200).json(
            common.formatResponse({
              type: "Resend",
              code: "A new OTP has been resent to your E-mail"
            })
          );
        } else {
          console.log(err);
        }
      });
    }
  });
});

module.exports = router;
