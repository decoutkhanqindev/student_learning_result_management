require("dotenv").config();
const configMongodb = require("./config/configMongodb");
const configClient = require("./config/configClient");
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/apiRouter");
const clientRouter = require("./routes/clientRouter");

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;
const MONGO_DB_URI = env.MONGO_DB_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(apiRouter);
app.use(clientRouter);

configMongodb(MONGO_DB_URI);
configClient(app);

app.listen(PORT, () => {
  console.log(`\n>>> Server is running at http://localhost:${PORT}/.`);
});
