const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("Email is invalid");
    //   }
    // },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: true,
    default: "subscriber",
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  description: {
    type: String,
    trim: true,
  },
  qualification: [
    {
      title: { type: String, required: true },
      year: { type: String, required: true },
    },
  ],
});

// userSchema.pre("save", async function () {
//   const user = this;
//   console.log("this is middleware in usermodel");
//   next();
// });

const User = mongoose.model("User", userSchema);
User.init();
module.exports = User;
