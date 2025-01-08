const mongoose = require("mongoose");

const connect = (uri) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log(">>> Database connected successful.");
    })
    .catch((error) => {
      console.log(`>>> Database connected failed:\n${error}.`);
      throw error
    });
};

module.exports = connect
