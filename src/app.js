require("dotenv").config();
require("./config/mongodb"); // connect db
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/router");

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`>>> Server is running on http://localhost:${PORT}/.`);
});
