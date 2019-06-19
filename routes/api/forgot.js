const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../models/User");

router.post("/", (req, res) => {
    console.log("forgot password", req.body);

});

module.exports = router;
