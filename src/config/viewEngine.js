const express = require("express");
const path = require("path");

const config = (app) => {
  app.set("view engine", "ejs");
  app.set("views", path.join("./src", "views"));
};

module.exports = config;
