const studentService = require("../services/studentService");

class StudentController {
  static async getAllStudentController(req, res) {
    try {
      console.log("\n>>> getAllStudentController is called.");
      const students = await studentService.getAllStudentsService();
      if (!students.length) {
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
      const _id = req.params.id;
      const student = await studentService.getStudentByIdService(_id);
      if (!student) {
        res.status(404).json({ message: `No student with ${_id} found.` });
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
      const { _id, fullName, className, subjects } = req.body;
      // check input data is empty or not
      if (!_id.trim() || !fullName.trim() || !className.trim()) {
        res.status(400).json({ message: "Incorrect student data in body." });
      } else {
        // check new student is already exists or not
        const currentStudent = await studentService.getStudentByIdService(_id);
        if (!currentStudent) {
          const newStudent = await studentService.addStudentService(
            _id,
            fullName,
            className,
            subjects
          );
          res.status(201).json(newStudent);
        } else {
          // add new student to db
          res.status(400).json({
            message: `A student with id ${_id} already exists.`
          });
        }
      }
    } catch (error) {
      console.log("\n>>> addStudentController have error: " + error.message);
      res.status(500).json({ message: error.message });
    }
  }

  static async updateStudentByIdController(req, res) {
    try {
      console.log("\n>>> updateStudentController is called.");
      const _id = req.params.id;
      const { fullName, className, subjects } = req.body;
      const currentStudent = await studentService.getStudentByIdService(_id);
      if (!currentStudent) {
        res.status(404).json({ message: `No student with ${_id} found.` });
      } else {
        const updatedStudent = await studentService.updateStudentByIdService(
          _id,
          fullName,
          className,
          subjects
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
      const _id = req.params.id;
      const currentStudent = await studentService.getStudentByIdService(_id);
      if (!currentStudent) {
        res.status(404).json({ message: `No student with ${_id} found.` });
      } else {
        const deletedStudent = await studentService.deleteStudentByIdService(
          _id
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
//   console.log("\n>>> functionName is called.");
// } catch (error) {
//   console.log("\n>>> functionName have error: " + error.message);
//   res.status(500).json({ message: error.message });
// }
