const UserModel = require("../models/UserModel");

async function checkEmail(request, response) {
  try {
    const { email } = request.body;
    const checkEmail = await UserModel.findOne({ email }).select("-password");

    if (!checkEmail) {
      return response.status(400).send({
        message: "user not exists",
        error: true,
      });
    }
    return response.status(200).send({
      message: " email verified",
      success: true,
      data: checkEmail,
    });
  } catch (error) {
    return response.status(500).send({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkEmail;
