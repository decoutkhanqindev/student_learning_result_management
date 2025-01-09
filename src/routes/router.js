const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const subjectController = require("../controllers/subjectController");
const gradeController = require("../controllers/gradeController");

// student routes
router.get("/student/all", studentController.getAllStudentController);
router.get("/student/:_id", studentController.getStudentByIdController);
router.post("/student", studentController.addStudentController);
router.put("/student/:_id", studentController.updateStudentByIdController);
router.delete("/student/:_id", studentController.deleteStudentByIdController);

// subject routes
router.get("/subject/all", subjectController.getAllSubjectsController);
router.get("/subject/:_id", subjectController.getSubjectByIdController);
router.post("/subject", subjectController.addSubjectController);
router.put("/subject/:_id", subjectController.updateSubjectByIdController);
router.delete("/subject/:_id", subjectController.deleteSubjectByIdController);

// grade routes
router.get("/grade/all", gradeController.getAllGradesController);
router.get(
  "/grade/:studentId/:subjectId",
  gradeController.getGradeByStudentIdAndSubjectIdController
);
router.get(
  "/grade/:studentId",
  gradeController.getAllGradesByStudentIdController
);
router.post("/grade", gradeController.addGradeController);
router.put(
  "/grade/:studentId/:subjectId",
  gradeController.updateGradeByStudentIdAndSubjectIdController
);
router.delete(
  "/grade/:studentId/:subjectId",
  gradeController.deleteGradeByStudentIdAndSubjectIdController
);

module.exports = router;
