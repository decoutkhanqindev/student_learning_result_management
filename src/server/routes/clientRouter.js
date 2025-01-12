const express = require("express");
const router = express.Router();
const path = require("path");

// client route
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/html/index.html"));
});

module.exports = router;
