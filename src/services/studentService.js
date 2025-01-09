const Student = require("../models/studentModel");

class StudentService {
  static async getAllStudentsService() {
    try {
      console.log("\n>>> getAllStudentsService is called.");
      const students = await Student.find();
      return students;
    } catch (error) {
      console.log("\n>>> getAllStudentsService have error: " + error.message);
    }
  }

  static async getStudentByIdService(id) {
    try {
      console.log("\n>>> getStudentByIdService is called.");
      const student = await Student.findById(id);
      return student;
    } catch (error) {
      console.log("\n>>> getStudentByIdService have error: " + error.message);
    }
  }

  static async addStudentService(studentData) {
    try {
      console.log("\n>>> addStudentService is called.");
      const newStudent = new Student(studentData);
      return await newStudent.save();
    } catch (error) {
      console.log("\n>>> addStudentService have error: ", error.message);
    }
  }

  static async updateStudentService(id, studentData) {
    try {
      console.log("\n>>> updateStudentService is called.");
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        studentData,
        { new: true } // return new document
      );
      return updatedStudent;
    } catch (error) {
      console.log("\n>>> updateStudentService have error: ", error.message);
    }
  }

  static async deleteStudentByIdService(id) {
    try {
      console.log("\n>>> deleteStudentByIdService is called.");
      const deletedStudent = await Student.findByIdAndDelete(id);
      return deletedStudent;
    } catch (error) {
      console.log("\n>>> deleteStudentByIdService have error: ", error.message);
    }
  }
}

module.exports = StudentService;

// try-catch template
// try {
//   console.log("\n>>> functioName is called.");
// } catch (error) {
//   console.log("\n>>> functioName have error: ", error.message);
// }
