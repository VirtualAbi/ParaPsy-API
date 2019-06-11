const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  userid: {
    type: String
  },
  name: {
    type: String
  },
  mobile: {
    type: String
  },
  countryid: {
    type: String
  },
  statid: {
    type: String
  },
  cityid: {
    type: String
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
