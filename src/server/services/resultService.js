const Result = require("../models/resultModel");

class ResultService {
  static async getAllResultsService() {
    try {
      console.log(`\n>>> getAllResultsService is called`);
      const results = await Result.find();
      return results;
    } catch (error) {
      console.log(`\n>>> getAllResultsService have error:  ${error}.`);
      throw error;
    }
  }

  static async getAllResultsByStudentIdService(studentId) {
    try {
      console.log(`\n>>> getAllResultsByStudentIdService is called`);
      const results = await Result.find({ studentId: studentId });
      return results;
    } catch (error) {
      console.log(
        `\n>>> getAllResultsByStudentIdService have error:  ${error}.`
      );
      throw error;
    }
  }

  static async getResultByStudentIdAndSubjectIdService(studentId, subjectId) {
    try {
      console.log(`\n>>> getResultByStudentIdAndSubjectIdService is called`);
      const result = await Result.findOne({
        studentId: studentId,
        subjectId: subjectId
      });
      return result;
    } catch (error) {
      console.log(
        `\n>>> getResultByStudentIdAndSubjectIdService have error:  ${error}.`
      );
      throw error;
    }
  }

  static async autoCalculateAvgScore(regularExam, middleExam, finalExam) {
    try {
      console.log(`\n>>> autoCalculateAvgScore is called`);
      const avgScore = regularExam * 0.2 + middleExam * 0.3 + finalExam * 0.5;
      return avgScore;
    } catch (error) {
      console.log(`\n>>> autoCalculateAvgScore have error:  ${error}.`);
      throw error;
    }
  }

  static async addResultService(newData) {
    try {
      console.log(`\n>>> addResultService is called`);
      const { studentId, subjectId, regularExam, middleExam, finalExam } =
        newData;
      const avgScore = await this.autoCalculateAvgScore(
        regularExam,
        middleExam,
        finalExam
      );
      const newResult = new Result({
        studentId,
        subjectId,
        regularExam,
        middleExam,
        finalExam,
        avgScore
      });
      const addedResult = await newResult.save();
      return addedResult;
    } catch (error) {
      console.log(`\n>>> addResultService have error:  ${error}.`);
      throw error;
    }
  }

  static async updateResultService(studentId, subjectId, updatedData) {
    try {
      console.log(`\n>>> updateResultService is called`);
      const result = await this.getResultByStudentIdAndSubjectIdService(
        studentId,
        subjectId
      );
      if (result) {
        const { regularExam, middleExam, finalExam } = updatedData;
        const updatedAvgScore = await this.autoCalculateAvgScore(
          regularExam || result.regularExam,
          middleExam || result.middleExam,
          finalExam || result.finalExam
        );
        await result.updateOne(
          {
            ...updatedData,
            avgScore: updatedAvgScore
          },
          { new: true }
        );
      }
      const updatedResult = await this.getResultByStudentIdAndSubjectIdService(
        studentId,
        subjectId
      );
      return updatedResult;
    } catch (error) {
      console.log(`\n>>> updateResultService have error:  ${error}.`);
      throw error;
    }
  }

  static async deleteResultService(studentId, subjectId) {
    try {
      console.log(`\n>>> deleteResultService is called`);
      const deletedResult = await Result.findOneAndDelete({
        studentId: studentId,
        subjectId: subjectId
      });
      return deletedResult;
    } catch (error) {
      console.log(`\n>>> deleteResultService have error:  ${error}.`);
      throw error;
    }
  }
}

module.exports = ResultService;

// try {
//  console.log(`\n>>> functionName is called`);
// } catch (error) {
//   console.log(`\n>>> functionName have error:  ${error}.`);
//   throw error
// }
