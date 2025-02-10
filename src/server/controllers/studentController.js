const studentService = require("../services/studentService");
const subjectService = require("../services/subjectService");

class StudentController {
  static async getAllStudentController(req, res) {
    try {
      console.log(`\n>>> getAllStudentController is called`);
      const students = await studentService.getAllStudentsService();
      if (!students.length) {
        return res.status(404).json({ message: "No students found." });
      }
      return res.status(200).json(students);
    } catch (error) {
      console.log(`\n>>> getAllStudentController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async getStudentByIdController(req, res) {
    try {
      console.log(`\n>>> GET: /admin/student/${req.params.id}`);
      console.log(`\n>>> getStudentByIdController is called`);
      const studentId = req.params.id;
      const student = await studentService.getStudentByIdService(studentId);
      if (!student) {
        return res
          .status(404)
          .json({ message: `No student with ${studentId} found.` });
      }
      return res.status(200).json(student);
    } catch (error) {
      console.log(`\n>>> getStudentByIdController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async getSubjectsByStudentIdController(req, res) {
    try {
      console.log(`\n>>> getSubjectsByStudentIdController is called`);
      const studentId = req.params.id;
      const student = await studentService.getStudentByIdService(studentId);
      if (!student) {
        return res
          .status(404)
          .json({ message: `No student with ${studentId} found.` });
      }
      const subjectIds = await studentService.getSubjectsByStudentIdService(
        studentId
      );
      if (!subjectIds.length) {
        return res
          .status(404)
          .json({ message: `No subjects found of student with ${studentId}.` });
      }
      // Promise.all help fetch all subjects concurrently
      const subjects = await Promise.all(
        subjectIds.map(async (subjectId) => {
          const subject = await subjectService.getSubjectByIdService(subjectId);
          return subject;
        })
      );
      return res.status(200).json(subjects);
    } catch (error) {
      console.log(
        `\n>>> getSubjectsByStudentIdController have error:  ${error}.`
      );
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async addStudentController(req, res) {
    try {
      console.log(`\n>>> addStudentController is called`);
      const newData = req.body;
      if (!newData.name || !newData.major) {
        return res
          .status(400)
          .json({ message: "Please provide name and major of student." });
      }
      const newStudent = await studentService.addStudentService(newData);
      return res.status(201).json(newStudent);
    } catch (error) {
      console.log(`\n>>> addStudentController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async updateStudentController(req, res) {
    try {
      console.log(`\n>>> updateStudentController is called`);
      const studentId = req.params.id;
      const updatedData = req.body;
      if (!updatedData.name && !updatedData.major) {
        return res.status(400).json({
          message: "At least name or major of student must be updated."
        });
      }
      const updatedStudent = await studentService.updateStudentService(
        studentId,
        updatedData
      );
      if (!updatedStudent) {
        return res
          .status(404)
          .json({ message: `No student with ${studentId} found.` });
      }
      return res.status(201).json(updatedStudent);
    } catch (error) {
      console.log(`\n>>> updateStudentController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async deleteStudentController(req, res) {
    try {
      console.log(`\n>>> deleteStudentController is called`);
      const studentId = req.params.id;
      const deletedStudent = await studentService.deleteStudentService(
        studentId
      );
      if (!deletedStudent) {
        return res
          .status(404)
          .json({ message: `No student with ${studentId} found.` });
      }
      return res.status(200).json(deletedStudent);
    } catch (error) {
      console.log(`\n>>> deleteStudentController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async registerSubjectController(req, res) {
    try {
      console.log(`\n>>> registerSubjectController is called`);
      const { studentId, subjectId } = req.params;
      const subject = await subjectService.getSubjectByIdService(subjectId);
      if (!subject) {
        return res
          .status(404)
          .json({ message: `No subject with ${subjectId} found.` });
      }
      const registeredStudent = await studentService.registerSubjectService(
        studentId,
        subjectId
      );
      if (!registeredStudent) {
        return res
          .status(404)
          .json({ message: `No student with ${studentId} found.` });
      }
      return res.status(201).json(registeredStudent);
    } catch (error) {
      console.log(`\n>>> registerSubjectController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }

  static async cancelSubjectController(req, res) {
    try {
      console.log(`\n>>> cancelSubjectController is called`);
      const { studentId, subjectId } = req.params;
      const canceledSubject = await studentService.cancelSubjectService(
        studentId,
        subjectId
      );
      if (!canceledSubject) {
        return res
          .status(404)
          .json({ message: `No student with ${studentId} found.` });
      }
      return res.status(200).json(canceledSubject);
    } catch (error) {
      console.log(`\n>>> cancelSubjectController have error:  ${error}.`);
      return res.status(500).json({ error: `${error}.` });
    }
  }
}

module.exports = StudentController;

// try {
//  console.log(`\n>>> functionName is called`);
// } catch (error) {
//   console.log(`\n>>> functionName have error:  ${error}.`);
//   return res.status(500).json({ error: `${error}.` });
// }
