const Subject = require("../models/subjectModel");

class SubjectService {
  static async getAllSubjectsService() {
    try {
      console.log("\n>>> getAllSubjectsService is called.");
      const subjects = await Subject.find().select("-__v");
      return subjects;
    } catch (error) {
      console.log("\n>>> getAllSubjectsService have error: ", error.message);
      throw error;
    }
  }

  static async getSubjectByIdService(_id) {
    try {
      console.log("\n>>> getSubjectByIdService is called.");
      const subject = await Subject.findById(_id).select("-__v");
      return subject;
    } catch (error) {
      console.log("\n>>> getSubjectByIdService have error: ", error.message);
      throw error;
    }
  }

  static async addSubjectService(_id, subjectName, teacher) {
    try {
      console.log("\n>>> addSubjectService is called.");
      const newSubject = new Subject({ _id, subjectName, teacher });
      return await newSubject.save();
    } catch (error) {
      console.log("\n>>> addSubjectService have error: ", error.message);
      throw error;
    }
  }

  static async updateSubjectByIdService(_id, subjectName, teacher) {
    try {
      console.log("\n>>> updateSubjectByIdService is called.");
      const updatedSubject = await Subject.findByIdAndUpdate(
        _id,
        { subjectName, teacher },
        { new: true } // return updated document
      );
      return updatedSubject;
    } catch (error) {
      console.log("\n>>> updateSubjectByIdService have error: ", error.message);
      throw error;
    }
  }

  static async deleteSubjectByIdService(_id) {
    try {
      console.log("\n>>> deleteSubjectByIdService is called.");
      const deletedSubject = await Subject.findByIdAndDelete(_id);
      return deletedSubject;
    } catch (error) {
      console.log("\n>>> deleteSubjectByIdService have error: ", error.message);
      throw error;
    }
  }
}

module.exports = SubjectService;

// try-catch template
// try {
//   console.log("\n>>> functioName is called.");
// } catch (error) {
//   console.log("\n>>> functioName have error: ", error.message);
//   throw error;
// }
