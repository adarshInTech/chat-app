const express = require("express");

const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const router = require("./routes/index.js");
const cookiesParser = require("cookie-parser");

const { server, app } = require("./socket/index.js");
// const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 5000;

app.get("/", (request, response) => {
  response.status(200).send({
    message: `server is running on port ${PORT}`,
  });
});
// api routes
app.use("/api", router);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("server running at " + PORT);
  });
});
