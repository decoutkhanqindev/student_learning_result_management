const Student = require("../models/studentModel");

class StudentService {
  static async getAllStudentsService() {
    try {
      console.log(`\n>>> getAllStudentsService is called`);
      const students = await Student.find();
      return students;
    } catch (error) {
      console.log(`\n>>> getAllStudentsService have error:  ${error}.`);
      throw error;
    }
  }

  static async getStudentByIdService(studentId) {
    try {
      console.log(`\n>>> getStudentByIdService is called`);
      const student = await Student.findOne({ studentId: studentId });
      return student;
    } catch (error) {
      console.log(`\n>>> getStudentByIdService have error:  ${error}.`);
      throw error;
    }
  }

  static async autoGenerateStudentId() {
    try {
      console.log(`\n>>> autoGenerateStudentId is called`);
      const lastStudent = await Student.findOne().sort({ studentId: -1 });
      if (!lastStudent) return "S001";
      const lastId = lastStudent.studentId;
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
      console.log(`\n>>> autoGenerateStudentId have error:  ${error}.`);
      throw error;
    }
  }

  static async addStudentService(newData) {
    try {
      console.log(`\n>>> addStudentService is called`);
      const studentId = await this.autoGenerateStudentId();
      const { name, major } = newData;
      const newStudent = new Student({
        studentId,
        name,
        major,
        subjectIds: []
      });
      const addedStudent = await newStudent.save();
      return addedStudent;
    } catch (error) {
      console.log(`\n>>> addStudentService have error:  ${error}.`);
      throw error;
    }
  }

  static async updateStudentService(studentId, updatedData) {
    try {
      console.log(`\n>>> updateStudentService is called`);
      const updatedStudent = await Student.findOneAndUpdate(
        { studentId: studentId },
        updatedData,
        { new: true }
      );
      return updatedStudent;
    } catch (error) {
      console.log(`\n>>> updateStudentService have error:  ${error}.`);
      throw error;
    }
  }

  static async deleteStudentService(studentId) {
    try {
      console.log(`\n>>> deleteStudentService is called`);
      const deletedStudent = await Student.findOneAndDelete({
        studentId: studentId
      });
      return deletedStudent;
    } catch (error) {
      console.log(`\n>>> deleteStudentService have error:  ${error}.`);
      throw error;
    }
  }

  static async registerSubjectService(studentId, newSubjectId) {
    try {
      console.log(`\n>>> registerSubjectService is called`);
      const registeredStudent = await Student.findOneAndUpdate(
        { studentId: studentId },
        { $addToSet: { subjectIds: newSubjectId } },
        { new: true }
      );
      return registeredStudent;
    } catch (error) {
      console.log(`\n>>> registerSubjectService have error:  ${error}.`);
      throw error;
    }
  }

  static async cancelSubjectService(studentId, subjectId) {
    try {
      console.log(`\n>>> cancelSubjectService is called`);
      const cancledStudent = await Student.findOneAndUpdate(
        { studentId: studentId },
        { $pull: { subjectIds: subjectId } },
        { new: true }
      );
      return cancledStudent;
    } catch (error) {
      console.log(`\n>>> cancelSubjectService have error:  ${error}.`);
      throw error;
    }
  }
}

module.exports = StudentService;

// try {
//  console.log(`\n>>> functionName is called`);
// } catch (error) {
//   console.log(`\n>>> functionName have error:  ${error}.`);
//   throw error
// }
