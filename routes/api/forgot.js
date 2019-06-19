const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../models/User");

router.post("/", (req, res) => {
  console.log("forgot password", req.body);

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        userid: ID,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        otp: OTP
      });
    }
  });
});

module.exports = router;
