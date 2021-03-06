const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes

app.use("/users", users);

//forgot password
const forgot = require("./routes/api/forgot");
app.use("/forgot", forgot);

//Forgot Password resend OTP
const forgotResend = require("./routes/api/forgotresendotp");
app.use("/forgotresend", forgotResend);

//Forgot Verify OTP
const forgotverifyotp = require("./routes/api/forgotverifyotp");
app.use("/forgotverifyotp", forgotverifyotp);

//New Password
const newPassword = require("./routes/api/newpassword");
app.use("/newpassword", newPassword);

//Resend OTP
const resendOTP = require("./routes/api/resendotp");
app.use("/resendotp", resendOTP);

//OTP Input
const otpInput = require("./routes/api/otp");
app.use("/otpinput", otpInput);

//Reset Password
let reset = require("./routes/api/reset");
app.use("/reset", reset);

//Country
let country = require('./routes/api/country');
app.use('/country', country);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
