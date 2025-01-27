const mongoose = require("mongoose");
// here provide name will be shown on the screen if user doesnot provide the name sort of error message in mongoose
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "provide name"],
    },

    email: {
      type: String,
      required: [true, "provide email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "provide password "],
    },

    profile_pic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
