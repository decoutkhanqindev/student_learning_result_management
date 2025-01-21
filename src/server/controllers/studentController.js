const studentService = require("../services/studentService");

class StudentController {
  static async getAllStudentsController(req, res) {
    try {
      console.log("\n>>> getAllStudentsController is called.");
      const students = await studentService.getAllStudentsService();
      if (!students) {
        res.status(404).json({ message: "No student found here." });
      }
      res.status(200).json(students);
    } catch (error) {
      console.log(
        "\n>>> getAllStudentsController have error: " + error.message
      );
      res.status(500).json({ message: "Server have error." });
    }
  }

  static async getStudentByIdController(req, res) {
    try {
      console.log("\n>>> getStudentByIdController is called.");
      const { id } = req.params;
      const student = await studentService.getStudentByIdService(id);
      if (!student) {
        res.status(404).json({ message: `Not found student with ${id} here.` });
      }
      res.status(200).json(student);
    } catch (error) {
      console.log(
        "\n>>> getStudentByIdController have error: " + error.message
      );
      res.status(500).json({ message: "Server have error." });
    }
  }

  static async addStudentController(req, res) {
    try {
      console.log("\n>>> addStudentController is called.");
      const { fullName, className, subjects } = req.body;
      if (!fullName || !className) {
        res.status(400).json({ message: "Missing student data in body." });
      }
      const addedStudent = await studentService.addStudentService(
        fullName,
        className,
        subjects
      );
      res.status(201).json(addedStudent);
    } catch (error) {
      console.log("\n>>> addStudentController have error: " + error.message);
      res.status(500).json({ message: "Server have error." });
    }
  }
}

module.exports = StudentController;

// try-catch template
// try {
//   console.log("\n>>> functionName is called.");
// } catch (error) {
//   console.log("\n>>> functionName have error: " + error.message);
//   res.status(500).json({ message: "Server have error." });
// }
