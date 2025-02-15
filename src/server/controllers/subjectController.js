const subjectService = require("../services/subjectService");
const studentService = require("../services/studentService");

class SubjectController {
  static async getAllSubjectController(req, res) {
    try {
      console.log(`\n>>> getAllSubjectController is called`);
      const subjects = await subjectService.getAllSubjectsService();
      if (!subjects.length) {
        return res.status(404).json({ message: "No subjects found." });
      }
      return res.status(200).json(subjects);
    } catch (error) {
      console.log(`\n>>> getAllSubjectController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async getSubjectByIdController(req, res) {
    try {
      console.log(`\n>>> getSubjectByIdController is called`);
      const subjectId = req.params.id;
      const subject = await subjectService.getSubjectByIdService(subjectId);
      if (!subject) {
        return res
          .status(404)
          .json({ message: `No subject with ${subjectId} found.` });
      }
      return res.status(200).json(subject);
    } catch (error) {
      console.log(`\n>>> getSubjectByIdController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async addSubjectController(req, res) {
    try {
      console.log(`\n>>> addSubjectController is called`);
      const newData = req.body;
      if (!newData.name || !newData.description) {
        return res
          .status(400)
          .json({ message: "Please provide name and description of subject." });
      }
      const newSubject = await subjectService.addSubjectService(newData);
      return res.status(201).json(newSubject);
    } catch (error) {
      console.log(`\n>>> addSubjectController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async updateSubjectController(req, res) {
    try {
      console.log(`\n>>> updateSubjectController is called`);
      const subjectId = req.params.id;
      const updatedData = req.body;
      if (!updatedData.name && !updatedData.description) {
        return res
          .status(400)
          .json({
            message: "At least name or description of subject must be updated."
          });
      }
      const updatedSubject = await subjectService.updateSubjectService(
        subjectId,
        updatedData
      );
      if (!updatedSubject) {
        return res
          .status(404)
          .json({ message: `No subject with ${subjectId} found.` });
      }
      return res.status(201).json(updatedSubject);
    } catch (error) {
      console.log(`\n>>> updateSubjectController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async deleteSubjectController(req, res) {
    try {
      console.log(`\n>>> deleteSubjectController is called`);
      const subjectId = req.params.id;
      const deletedSubject = await subjectService.deleteSubjectService(
        subjectId
      );
      if (!deletedSubject) {
        return res
          .status(404)
          .json({ message: `No subject with ${subjectId} found.` });
      }
      const students = await studentService.getAllStudentsService();
      students.forEach(async (student) => {
        if (student.subjectIds.includes(subjectId)) {
          await studentService.cancelSubjectService(
            student.studentId,
            subjectId
          );
        }
      });
      return res.status(200).json(deletedSubject);
    } catch (error) {
      console.log(`\n>>> deleteSubjectController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }
}

module.exports = SubjectController;

// try {
//  console.log(`\n>>> functionName is called`);
// } catch (error) {
//   console.log(`\n>>> functionName have error:  ${error}.`);
//   return res.status(500).json({ error: `${error}.` });
// }
