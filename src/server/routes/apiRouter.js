const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const subjectController = require("../controllers/subjectController");
const resultController = require("../controllers/resultController");

// student endpoints
router.get("/admin/student", studentController.getAllStudentController);
router.get("/admin/student/:id", studentController.getStudentByIdController);
router.post("/admin/student", studentController.addStudentController);
router.put("/admin/student/:id", studentController.updateStudentController);
router.delete("/admin/student/:id", studentController.deleteStudentController);
router.put(
  "/admin/student/:studentId/:subjectId",
  studentController.registerSubjectController
);
router.delete(
  "/admin/student/:studentId/:subjectId",
  studentController.cancelSubjectController
);

// subject enpoints
router.get("/admin/subject", subjectController.getAllSubjectController);
router.get("/admin/subject/:id", subjectController.getSubjectByIdController);
router.post("/admin/subject", subjectController.addSubjectController);
router.put("/admin/subject/:id", subjectController.updateSubjectController);
router.delete("/admin/subject/:id", subjectController.deleteSubjectController);

// result endpoints
router.get("/admin/result", resultController.getAllResultController);
router.get(
  "/admin/result/:studentId",
  resultController.getAllResultsByStudentIdController
);
router.get(
  "/admin/result/:studentId/:subjectId",
  resultController.getResultByStudentIdAndSubjectIdController
);
router.post("/admin/result", resultController.addResultController);
router.put(
  "/admin/result/:studentId/:subjectId",
  resultController.updateResultController
);
router.delete(
  "/admin/result/:studentId/:subjectId",
  resultController.deleteResultController
);

module.exports = router;
