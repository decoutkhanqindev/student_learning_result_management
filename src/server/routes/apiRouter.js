const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const subjectController = require("../controllers/subjectController");
const gradeController = require("../controllers/gradeController");

// student routes
router.get("/student/all", studentController.getAllStudentController);
router.get("/student/:id", studentController.getStudentByIdController);
router.post("/student", studentController.addStudentController);
router.put("/student/:id", studentController.updateStudentByIdController);
router.delete("/student/:id", studentController.deleteStudentByIdController);

// subject routes
router.get("/subject/all", subjectController.getAllSubjectsController);
router.get("/subject/:id", subjectController.getSubjectByIdController);
router.post("/subject", subjectController.addSubjectController);
router.put("/subject/:id", subjectController.updateSubjectByIdController);
router.delete("/subject/:id", subjectController.deleteSubjectByIdController);

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
