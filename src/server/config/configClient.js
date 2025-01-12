const express = require("express");
const path = require("path");

const config = (app) => {
  app.use(express.static(path.join(__dirname, "../../client")));
};

module.exports = config;
