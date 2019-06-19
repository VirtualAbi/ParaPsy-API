const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("forgot password", req.body);
});

module.exports = router;
