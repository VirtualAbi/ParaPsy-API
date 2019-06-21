const express = require("express");
const router = express.Router();
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
      console.log(user[0]);
             res.status(200).json(common.formatResponse({
                type: "Forgot OTP Verify",
                code: "OTP_VERIFIED",
                data: {
                        message : "OTP has been verified successfully",
                        data: {
                            UserID: user[0]._id
                        }
                  }
              })
             );
          } else {
            console.log(err);
          }
        });

});

module.exports = router;