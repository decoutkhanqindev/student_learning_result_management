require("dotenv").config();
const mongoose = require("mongoose");

const env = process.env
const MONGO_DB_URI = env.MONGO_DB_URI

const connect = (uri) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("\n>>> Database connected successful.");
    })
    .catch((error) => {
      console.log(`\n>>> Database connected failed:\n${error}.`);
    });
};

module.exports = connect(MONGO_DB_URI);
