const dotenv = require("dotenv");
const express = require("express");

dotenv.config();
const env = process.env;
const app = express();
const port = env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
