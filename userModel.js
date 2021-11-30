const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {type: Date, default: Date.now() },
  numberOfDays:{type: String}
});


const User = mongoose.model("User", userSchema);

module.exports = User;
