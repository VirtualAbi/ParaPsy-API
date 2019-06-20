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

  const { errors, isValid } = validateOtpInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let newOTP = common.generateOTP();
  let uid = new mongodb.ObjectId(req.body.userid);

  User.find({ _id: uid, otp: req.body.otp }).then(user => {
    if (user) {
      console.log(user);
      User.update(
        { _id: uid },
        { $set: { status: true, emailisverified: true,otp: newOTP } },
        (err, result) => {
          if (!err) {
            res.status(200).json(
              common.formatResponse({
                type: "Activation",
                code: "OTP and E-mail is Verified"
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
