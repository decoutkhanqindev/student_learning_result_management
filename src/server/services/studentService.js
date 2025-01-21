const Student = require("../models/studentModel");

class StudentService {
  static async getAllStudentsService() {
    try {
      console.log("\n>>> getAllStudentsService is called.");
      const students = await Student.find();
      return students;
    } catch (error) {
      console.log("\n>>> getAllStudentsService have error: ", error.message);
      throw error;
    }
  }

  static async getStudentByIdService(id) {
    try {
      console.log("\n>>> getStudentByIdService is called.");
      const student = await Student.findById({ _id: id });
      return student;
    } catch (error) {
      console.log("\n>>> getStudentByIdService have error: ", error.message);
      throw error;
    }
  }

  static async autoGenerateStudentId() {
    try {
      console.log("\n>>> autoGenerateStudentId is called.");
      const lastStudent = await Student.findOne().sort({ _id: -1 });
      if (!lastStudent) return "S001";
      const lastId = lastStudent._id;
      // sampled id is "S001"
      // lastId.substring(1) => "001"
      // parseInt(lastId.substring(1), 10) => 1 (base 10)
      const lastIdNumber = parseInt(lastId.substring(1), 10);
      const newIdNumber = lastIdNumber + 1;
      // sampled id number = 15
      // newIdNumber.toString() => "15"
      // padStart(3, "0") => "0015"
      const newStudentId = `S${newIdNumber.toString().padStart(3, "0")}`;
      return newStudentId;
    } catch (error) {
      console.log("\n>>> autoGenerateStudentId have error: ", error.message);
      throw error;
    }
  }

  static async addStudentService(fullName, className, subjects) {
    try {
      console.log("\n>>> addStudentService is called.");
      const _id = await StudentService.autoGenerateStudentId();
      const newStudent = new Student({ _id, fullName, className, subjects });
      const addedStudent = await newStudent.save();
      return addedStudent;
    } catch (error) {
      console.log("\n>>> addStudentService have error: ", error.message);
      throw error;
    }
  }
}

module.exports = StudentService;

// try-catch template
// try {
//   console.log("\n>>> functionName is called.");
// } catch (error) {
//   console.log("\n>>> functionName have error: ", error.message);
//   throw error;
// }
