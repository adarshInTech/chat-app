const UserModel = require("../models/UserModel.js");
const bcryptjs = require("bcryptjs");

async function registerUser(request, response) {
  try {
    const { name, email, password, profile_pic } = request.body;
    const checkEmail = await UserModel.findOne({ email });

    if (checkEmail) {
      return response.status(400).send({
        message: "Already exists",
        error: true,
      });
    }

    // password into hash Password

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      profile_pic,
      password: hashpassword,
    };

    const user = new UserModel(payload);
    const userSave = await user.save();
    return response.status(201).send({
      message: "user created successfully ",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return response.status(500).send({
      messgae: error.message || error,
      error: true,
    });
  }
}

module.exports = registerUser;
