require("dotenv").config();
const connectDb = require("./config/mongodb"); 
const configViewEngine = require("./config/viewEngine");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/router");

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;
const MONGO_DB_URI = env.MONGO_DB_URI

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

configViewEngine(app);
connectDb(MONGO_DB_URI);

app.listen(PORT, () => {
  console.log(`\n>>> Server is running on http://localhost:${PORT}/.`);
});
