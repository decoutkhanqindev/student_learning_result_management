require("dotenv").config();
const mongoose = require("mongoose");

const env = process.env
const MONGO_DB_URI = env.MONGO_DB_URI

const connect = (uri) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log(">>> Database connected successful.");
    })
    .catch((error) => {
      console.log(`>>> Database connected failed:\n${error}.`);
      throw error;
    });
};

module.exports = connect(MONGO_DB_URI);
