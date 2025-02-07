const resultServie = require("../services/resultService");
const studentService = require("../services/studentService");
const subjectService = require("../services/subjectService");

class ResultController {
  static async getAllResultController(req, res) {
    try {
      console.log(`\n>>> getAllResultController is called`);
      const results = await resultServie.getAllResultsService();
      if (!results.length) {
        return res.status(404).json({ message: "No results found." });
      }
      return res.status(200).json(results);
    } catch (error) {
      console.log(`\n>>> getAllResultController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async getAllResultsByStudentIdController(req, res) {
    try {
      console.log(`\n>>> getAllResultsByStudentIdController is called`);
      const studentId = req.params.studentId;
      const results = await resultServie.getAllResultsByStudentIdService(
        studentId
      );
      if (!results.length) {
        return res
          .status(404)
          .json({ message: `No results with ${studentId} found.` });
      }
      return res.status(200).json(results);
    } catch (error) {
      console.log(
        `\n>>> getAllResultsByStudentIdController have error:  ${error}.`
      );
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async getResultByStudentIdAndSubjectIdController(req, res) {
    try {
      console.log(`\n>>> getResultByStudentIdAndSubjectIdController is called`);
      const { studentId, subjectId } = req.params;
      const result = await resultServie.getResultByStudentIdAndSubjectIdService(
        studentId,
        subjectId
      );
      if (!result) {
        return res.status(404).json({
          message: `No result with ${studentId} and ${subjectId} found.`
        });
      }
      return res.status(200).json(result);
    } catch (error) {
      console.log(
        `\n>>> getResultByStudentIdAndSubjectIdController have error:  ${error}.`
      );
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async addResultController(req, res) {
    try {
      console.log(`\n>>> addResultController is called`);
      const newData = req.body;
      if (!newData.studentId || !newData.subjectId) {
        return res
          .status(400)
          .json({ message: "Please provide studentId and subjectId." });
      }
      if (!newData.regularExam || !newData.middleExam || !newData.finalExam) {
        return res.status(400).json({
          message: "Please provide regularExam, middleExam, and finalExam."
        });
      }
      const result = await resultServie.getResultByStudentIdAndSubjectIdService(
        newData.studentId,
        newData.subjectId
      );
      if (result) {
        return res.status(400).json({
          message: `Result with ${newData.studentId} and ${newData.subjectId} already exists.`
        });
      }
      const student = await studentService.getStudentByIdService(
        newData.studentId
      );
      if (!student) {
        return res.status(404).json({
          message: `No student with ${newData.studentId} found.`
        });
      }
      const subject = await subjectService.getSubjectByIdService(
        newData.subjectId
      );
      if (!subject) {
        return res.status(404).json({
          message: `No subject with ${newData.subjectId} found.`
        });
      }
      if (student.subjectIds.indexOf(newData.subjectId) === -1) {
        return res.status(400).json({
          message: `Student with ${newData.studentId} is not registered to subject with ${newData.subjectId}.`
        });
      }
      const addedResult = await resultServie.addResultService(newData);
      return res.status(201).json(addedResult);
    } catch (error) {
      console.log(`\n>>> addResultController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async updateResultController(req, res) {
    try {
      console.log(`\n>>> updateResultController is called`);
      const { studentId, subjectId } = req.params;
      const updatedData = req.body;
      if (
        !updatedData.regularExam &&
        !updatedData.middleExam &&
        !updatedData.finalExam
      ) {
        return res.status(400).json({
          message:
            "At least regularExam, middleExam, or finalExam of result must be updated."
        });
      }
      const updatedResult = await resultServie.updateResultService(
        studentId,
        subjectId,
        updatedData
      );
      if (!updatedResult) {
        return res.status(400).json({
          message: `No result with ${studentId} and ${subjectId} found.`
        });
      }
      return res.status(200).json(updatedResult);
    } catch (error) {
      console.log(`\n>>> updateResultController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async deleteResultController(req, res) {
    try {
      console.log(`\n>>> deleteResultController is called`);
      const { studentId, subjectId } = req.params;
      const deletedResult = await resultServie.deleteResultService(
        studentId,
        subjectId
      );
      if (!deletedResult) {
        return res.status(404).json({
          message: `No result with ${studentId} and ${subjectId} found.`
        });
      }
      return res.status(200).json(deletedResult);
    } catch (error) {
      console.log(`\n>>> deleteResultController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }
}

module.exports = ResultController;

// try {
//   console.log(`\n>>> functionName is called`);
// } catch (error) {
//   console.log(`\n>>> functionName have error:  ${error}.`);
//   return res.status(500).json({ error: `${error}.` });
// }
