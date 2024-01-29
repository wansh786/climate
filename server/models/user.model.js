const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    displayName: String,
    email: String,
    image: String,
  },
  {
    versionkey: false,
    timestamps: true,
  }
);

const UserModel = new mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
