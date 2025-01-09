const Grade = require("../models/gradeModel");

class GradeService {
  static async getAllGradesService() {
    try {
      console.log("\n>>> getAllGradesService is called.");
      const grades = await Grade.find().select("-__v").select("-_id");
      return grades;
    } catch (error) {
      console.log("\n>>> getAllGradesService have error: ", error.message);
    }
  }

  static async getGradeByStudentIdAndSubjectIdService(studentId, subjectId) {
    try {
      console.log("\n>>> getGradeByStudentIdAndSubjectIdService is called.");
      const grades = await Grade.findOne({ studentId, subjectId })
        .select("-_id")
        .select("-__v");
      return grades;
    } catch (error) {
      console.log(
        "\n>>> getGradeByStudentIdAndSubjectIdService have error: ",
        error.message
      );
    }
  }

  static async getAllGradesByStudentIdService(studentId) {
    try {
      console.log("\n>>> getAllGradeByStudentIdService is called.");
      const grades = await Grade.find({ studentId })
        .select("-_id")
        .select("-__v");
      return grades;
    } catch (error) {
      console.log(
        "\n>>> getAllGradeByStudentIdService have error: ",
        error.message
      );
    }
  }

  static async addGradeService(studentId, subjectId, averageScore) {
    try {
      console.log("\n>>> addScoreService is called.");
      const newGrade = new Grade({ studentId, subjectId, averageScore });
      return await newGrade.save();
    } catch (error) {
      console.log("\n>>> addScoreService have error: ", error.message);
    }
  }

  static async updateGradeByStudentIdAndSubjectIdService(
    studentId,
    subjectId,
    averageScore
  ) {
    try {
      console.log("\n>>> updateGradeByStudentIdAndSubjectIdService is called.");
      const updatedGrade = await Grade.findOneAndUpdate(
        { studentId, subjectId },
        averageScore,
        { new: true }
      )
        .select("-_id")
        .select("-__v");
      return updatedGrade;
    } catch (error) {
      console.log(
        "\n>>> updateGradeByStudentIdAndSubjectIdService have error: ",
        error.message
      );
    }
  }

  static async deleteGradeByStudentIdAndSubjectIdService(studentId, subjectId) {
    try {
      console.log("\n>>> deleteGradeByStudentIdAndSubjectIdService is called.");
      const deletedGrade = await Grade.findOneAndDelete({
        studentId,
        subjectId
      })
        .select("-_id")
        .select("-__v");
      return deletedGrade;
    } catch (error) {
      console.log(
        "\n>>> deleteGradeByStudentIdAndSubjectIdService have error: ",
        error.message
      );
    }
  }
}

module.exports = GradeService;

// try-catch template
// try {
//   console.log("\n>>> functioName is called.");
// } catch (error) {
//   console.log("\n>>> functioName have error: ", error.message);
// }
