const Subject = require("../models/subjectModel");

class SubjectService {
  static async getAllSubjectsService() {
    try {
      console.log("\n>>> getAllSubjectsService is called.");
      const subjects = await Subject.find();
      return subjects;
    } catch (error) {
      console.log("\n>>> getAllSubjectsService have error: ", error.message);
    }
  }

  static async getSubjectByIdService(id) {
    try {
      console.log("\n>>> getSubjectByIdService is called.");
      const subject = await Subject.findById(id);
      return subject;
    } catch (error) {
      console.log("\n>>> getSubjectByIdService have error: ", error.message);
    }
  }

  static async addSubjectService(subjectData) {
    try {
      console.log("\n>>> addSubjectService is called.");
      const newSubject = new Subject(subjectData);
      return await newSubject.save();
    } catch (error) {
      console.log("\n>>> addSubjectService have error: ", error.message);
    }
  }

  static async updateSubjectByIdService(id, subjectData) {
    try {
      console.log("\n>>> updateSubjectByIdService is called.");
      const updatedSubject = await Subject.findByIdAndUpdate(
        id,
        subjectData,
        { new: true } // return new document
      );
      return updatedSubject;
    } catch (error) {
      console.log("\n>>> updateSubjectByIdService have error: ", error.message);
    }
  }

  static async deleteSubjectByIdService(id) {
    try {
      console.log("\n>>> deleteSubjectByIdService is called.");
      const deletedSubject = await Subject.findByIdAndDelete(id);
      return deletedSubject;
    } catch (error) {
      console.log("\n>>> deleteSubjectByIdService have error: ", error.message);
    }
  }
}

module.exports = SubjectService;

// try-catch template
// try {
//   console.log("\n>>> functioName is called.");
// } catch (error) {
//   console.log("\n>>> functioName have error: ", error.message);
// }
