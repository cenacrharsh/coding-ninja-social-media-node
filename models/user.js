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
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

//> Static Methods
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);

//* make AVATAR_PATH publically avaiable
userSchema.statics.avatarPath = AVATAR_PATH;

//> make it a model in the database
const User = mongoose.model("User", userSchema);

module.exports = User;
