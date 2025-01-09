const gradeService = require("../services/gradeService");
const studentService = require("../services/studentService");

class GradeController {
  static async getAllGradesController(req, res) {
    try {
      console.log("\n>>> getAllGradesController is called.");
      const grades = await gradeService.getAllGradesService();
      if (!grades.length) {
        res.status(404).json({ message: "No grade found here." });
      } else {
        res.status(200).json(grades);
      }
    } catch (error) {
      console.log("\n>>> getAllGradesController have error: " + error.message);
      res.status(500).json({ message: error.message });
    }
  }

  static async getGradeByStudentIdAndSubjectIdController(req, res) {
    try {
      console.log("\n>>> getGradeByStudentIdAndSubjectIdController is called.");
      const { studentId, subjectId } = req.params;
      const grade = await gradeService.getGradeByStudentIdAndSubjectIdService(
        studentId,
        subjectId
      );
      if (!grade) {
        res.status(404).json({
          message: `No grade with student id ${studentId} and subject id ${subjectId} found.`
        });
      } else {
        res.status(200).json(grade);
      }
    } catch (error) {
      console.log(
        "\n>>> getGradeByStudentIdAndSubjectIdController have error: " +
          error.message
      );
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllGradesByStudentIdController(req, res) {
    try {
      console.log("\n>>> getAllGradesByStudentIdController is called.");
      const studentId = req.params.studentId;
      const grades = await gradeService.getAllGradesByStudentIdService(
        studentId
      );
      if (!grades.length) {
        res.status(404).json({
          message: `No grade with student id ${studentId} found.`
        });
      } else {
        res.status(200).json(grades);
      }
    } catch (error) {
      console.log(
        "\n>>> getAllGradesByStudentIdController have error: " + error.message
      );
      res.status(500).json({ message: error.message });
    }
  }

  static async addGradeController(req, res) {
    try {
      console.log("\n>>> addGradeController is called.");
      const { studentId, subjectId, averageScore } = req.body;
      // check input data is empty or not
      if (!studentId || !subjectId || !averageScore) {
        res.status(400).json({ message: "Incorrect grade data in body." });
      } else {
        // check new grade is already exists or not
        const currentGrade =
          await gradeService.getGradeByStudentIdAndSubjectIdService(
            studentId,
            subjectId
          );
        if (!currentGrade) {
          // check student have learned subject or not
          const subjectIds = await studentService.getAllSubjectIdsByIdService(
            studentId
          );
          if (!subjectIds.includes(subjectId)) {
            res.status(400).json({
              message: `A student with id ${studentId} have not learned subject with id ${subjectId}.`
            });
          } else {
            // add new grade to db
            const newGrade = await gradeService.addGradeService(
              studentId,
              subjectId,
              averageScore
            );
            res.status(201).json(newGrade);
          }
        } else {
          res.status(400).json({
            message: `A grade with student id ${studentId} and subject id ${subjectId} already exists.`
          });
        }
      }
    } catch (error) {
      console.log("\n>>> addGradeController have error: " + error.message);
      res.status(500).json({ message: error.message });
    }
  }

  static async updateGradeByStudentIdAndSubjectIdController(req, res) {
    try {
      console.log(
        "\n>>> updateGradeByStudentIdAndSubjectIdController is called."
      );
      const { studentId, subjectId } = req.params;
      const averageScore = req.body;
      const currentGrade =
        await gradeService.getGradeByStudentIdAndSubjectIdService(
          studentId,
          subjectId
        );
      if (!currentGrade) {
        res.status(404).json({
          message: `No grade with student id ${studentId} and subject id ${subjectId} found.`
        });
      } else {
        const updatedGrade =
          await gradeService.updateGradeByStudentIdAndSubjectIdService(
            studentId,
            subjectId,
            averageScore
          );
        res.status(200).json(updatedGrade);
      }
    } catch (error) {
      console.log(
        "\n>>> updateGradeByStudentIdAndSubjectIdController have error: " +
          error.message
      );
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteGradeByStudentIdAndSubjectIdController(req, res) {
    try {
      console.log(
        "\n>>> deleteGradeByStudentIdAndSubjectIdController is called."
      );
      const { studentId, subjectId } = req.params;
      const currentGrade =
        await gradeService.getGradeByStudentIdAndSubjectIdService(
          studentId,
          subjectId
        );
      if (!currentGrade) {
        res.status(404).json({
          message: `No grade with student id ${studentId} and subject id ${subjectId} found.`
        });
      } else {
        const deletedGrade =
          await gradeService.deleteGradeByStudentIdAndSubjectIdService(
            studentId,
            subjectId
          );
        res.status(200).json(deletedGrade);
      }
    } catch (error) {
      console.log(
        "\n>>> deleteGradeByStudentIdAndSubjectIdController have error: " +
          error.message
      );
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = GradeController;

// try-catch template
// try {
//   console.log("\n>>> functioName is called.");
// } catch (error) {
//   console.log("\n>>> functioName have error: " + error.message);
//   res.status(500).json({ message: error.message });
// }
