const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// student routes
router.get("/student/all", studentController.getAllStudentController);
router.get("/student/:id", studentController.getStudentByIdController);
router.post("/student", studentController.addStudentController);
router.put("/student/:id", studentController.updateStudentController)
router.delete("/student/:id", studentController.deleteStudentByIdController);

module.exports = router;
