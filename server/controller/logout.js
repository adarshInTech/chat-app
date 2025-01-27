async function logout(request, response) {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    return response.cookie("token", "", cookieOptions).status(200).send({
      message: "session out",
      success: true,
    });
  } catch (error) {
    return response.status(500).send({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = logout;
