const studentService = require("../services/studentService");
const Student = require("../models/studentModel");

class StudentController {
  static async getAllStudentController(req, res) {
    try {
      console.log("\n>>> getAllStudentController is called.");
      const students = await studentService.getAllStudentsService();
      if (!students) {
        res.status(404).json({ message: "No student found here." });
      } else {
        res.status(200).json(students);
      }
    } catch (error) {
      console.log("\n>>> getAllStudentController have error: " + error.message);
      res.status(500).json({ message: error.message });
    }
  }

  static async getStudentByIdController(req, res) {
    try {
      console.log("\n>>> getStudentByIdController is called.");
      let id = req.params.id;
      const student = await studentService.getStudentByIdService(id);
      if (!student) {
        res.status(404).json({ message: `No student with ${id} found.` });
      } else {
        res.status(200).json(student);
      }
    } catch (error) {
      console.log(
        "\n>>> getStudentByIdController have error: " + error.message
      );
      res.status(500).json({ message: error.message });
    }
  }

  static async addStudentController(req, res) {
    try {
      console.log("\n>>> addStudentController is called.");
      const studentData = req.body;
      if (!studentData._id || !studentData.fullName || !studentData.className) {
        res.status(400).json({ message: "Incorrect student data in body." });
      } else {
        const currentStudent = await studentService.getStudentByIdService(
          studentData._id
        );
        if (!currentStudent) {
          const newStudent = await studentService.addStudentService(
            studentData
          );
          res.status(201).json(newStudent);
        } else {
          res.status(400).json({
            message: `A student with ${studentData._id} already exists.`
          });
        }
      }
    } catch (error) {
      console.log("\n>>> addStudentController have error: " + error.message);
      res.status(500).json({ message: error.message });
    }
  }

  static async updateStudentController(req, res) {
    try {
      console.log("\n>>> updateStudentController is called.");
      let id = req.params.id;
      const studentData = req.body;
      const currentStudent = await studentService.getStudentByIdService(id);
      if (!currentStudent) {
        res.status(404).json({ message: `No student with ${id} found.` });
      } else {
        const updatedStudent = await studentService.updateStudentService(
          id,
          studentData
        );
        res.status(200).json(updatedStudent);
      }
    } catch (error) {
      console.log("\n>>> updateStudentController have error: " + error.message);
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteStudentByIdController(req, res) {
    try {
      console.log("\n>>> deleteStudentByIdController is called.");
      let id = req.params.id;
      const currentStudent = await studentService.getStudentByIdService(id);
      if (!currentStudent) {
        res.status(404).json({ message: `No student with ${id} found.` });
      } else {
        const deletedStudent = await studentService.deleteStudentByIdService(
          id
        );
        res.status(200).json(deletedStudent);
      }
    } catch (error) {
      console.log(
        "\n>>> deleteStudentByIdController have error: " + error.message
      );
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = StudentController;

// try-catch template
// try {
//   console.log("\n>>> functioName is called.");
// } catch (error) {
//   console.log("\n>>> functioName have error: " + error.message);
//   res.status(500).json({ message: error.message });
// }
