const express = require("express");
const router = express.Router();
const validateForgotInput = require("../../validation/forgot");
const common = require("../../common.js");


// Load User model
const User = require("../../models/User");

router.post("/", (req, res) => {
  console.log("forgot password", req.body);

  const { errors, isValid } = validateForgotInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;

  //Verify User by E-mail
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "This E-mail is not Registered";
      return res.status(404).json(errors);
    }
    else{
    console.log(user);
    var newOTP = common.generateOTP();
    User.update(
      { email },
      { $set: { otp: newOTP } },
      (err, result) => {
        if (!err) {
          res.status(200).json(
            common.formatResponse({
              type: "OTP Sent",
              code: "OTP has been sent to your E-mail"
            })
          );  
          } 
        })
    }
  });
})
module.exports = router;
