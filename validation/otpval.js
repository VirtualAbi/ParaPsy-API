const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateOtpInput(data) {
  let errors = {};

  data.otp = !isEmpty(data.otp) ? data.otp : "";

  if (Validator.isEmpty(data.otp)) {
    errors.otp = "OTP is required";
  }
  if (data.otp.length < 4) {
    errors.otp = "Please enter a valid otp";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
