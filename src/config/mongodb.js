const mongoose = require("mongoose");

const connect = (uri) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("\n>>> Database connected successful.");
    })
    .catch((error) => {
      console.log(`\n>>> Database connection have error:\n${error}.`);
      throw error
    });
};

module.exports = connect;
