const mongoose = require("mongoose");


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
  sendDate: {
    type: Date,
    required: true,
    maxLength: 10,
  },
  createdAt: {type: Date, default: Date.now() },

});


const User = mongoose.model("User", userSchema);

module.exports = User;
