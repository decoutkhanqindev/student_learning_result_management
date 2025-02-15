const express = require("express");
const router = express.Router();
const path = require("path");

// admin  endpoint
router.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/admin/html/home.html"));
});

// student endpoint
router.get("/student", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/student/html/home.html"));
}); 

module.exports = router;
