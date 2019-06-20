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
});

module.exports = router;
