const Student = require("../models/studentModel");

class StudentService {
  static async getAllStudentsService() {
    try {
      console.log("\n>>> getAllStudentsService is called.");
      const students = await Student.find().select("-subjects").select("-__v");
      return students;
    } catch (error) {
      console.log("\n>>> getAllStudentsService have error: " + error.message);
    }
  }

  static async getStudentByIdService(_id) {
    try {
      console.log("\n>>> getStudentByIdService is called.");
      const student = await Student.findById(_id).select("-__v");
      return student;
    } catch (error) {
      console.log("\n>>> getStudentByIdService have error: " + error.message);
    }
  }

  static async getAllSubjectIdsByIdService(_id) {
    try {
      console.log("\n>>> getAllSubjectIdsByIdService is called.");
      const student = await this.getStudentByIdService(_id);
      const subjects = student.subjects.map((subject) => subject._id);
      return subjects;
    } catch (error) {
      console.log(
        "\n>>> getAllSubjectIdsByIdService have error: " + error.message
      );
    }
  }

  static async addStudentService(_id, fullName, className, subjects) {
    try {
      console.log("\n>>> addStudentService is called.");
      const newStudent = new Student({ _id, fullName, className, subjects });
      return await newStudent.save();
    } catch (error) {
      console.log("\n>>> addStudentService have error: ", error.message);
    }
  }

  static async updateStudentByIdService(_id, fullName, className, subjects) {
    try {
      console.log("\n>>> updateStudentService is called.");
      const updatedStudent = await Student.findByIdAndUpdate(
        _id,
        { fullName, className, subjects },
        { new: true } // return new document
      ).select("-__v");
      return updatedStudent;
    } catch (error) {
      console.log("\n>>> updateStudentService have error: ", error.message);
    }
  }

  static async deleteStudentByIdService(_id) {
    try {
      console.log("\n>>> deleteStudentByIdService is called.");
      const deletedStudent = await Student.findByIdAndDelete(_id).select("-__v");
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
