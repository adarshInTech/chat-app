const mongoose = require("mongoose");

async function connectDB() {
  try {
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("connected to db");
    });

    connection.on("error", (error) => {
      console.log("something is wrong in mongodb", error);
    });

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("something is wrong", error);
  }
}

module.exports = connectDB;
