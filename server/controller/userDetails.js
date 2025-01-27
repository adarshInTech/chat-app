const getUserDetailsFromToken = require("../helpers/getUserDetailFromToken");

async function userDetails(request, response) {
  try {
    const token = request.cookies.token || "";

    const user = await getUserDetailsFromToken(token);
    return response.status(200).send({
      message: "user details",
      data: user,
    });
  } catch (error) {
    return response.status(500).send({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = userDetails;
