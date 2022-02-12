const mongoose = require("mongoose");
const path = require("path");

//# Multer
const multer = require("multer");
const AVATAR_PATH = path.join("/uploads/users/avatars");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//> make it a model in the database
const User = mongoose.model("User", userSchema);

module.exports = User;
