const UserModel = require("../models/UserModel.js");

async function searchUser(request, response) {
  try {
    const { search } = request.body;
    const query = new RegExp(search, "i", "g");

    const user = await UserModel.find({
      $or: [
        {
          name: query,
        },
        {
          email: query,
        },
      ],
    });

    response.status(200).send({
      message: "all user",
      data: user,
      success: true,
    });
  } catch (error) {
    return response.status.send({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = searchUser;
