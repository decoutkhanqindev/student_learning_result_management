const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./config/mongodb")

const app = express();
dotenv.config();
const env = process.env;
const PORT = env.PORT || 8080;
const MONGO_DB_URI = env.MONGO_DB_URI

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDb(MONGO_DB_URI);

app.listen(PORT, () => {
  console.log(`>>> Server is running on port ${PORT}.`);
});
