const Subject = require("../models/subjectModel");

class SubjectService {
  static async getAllSubjectsService() {
    try {
      console.log(`\n>>> getAllSubjectsService is called`);
      const subjects = await Subject.find();
      return subjects;
    } catch (error) {
      console.log(`\n>>> getAllSubjectsService have error:  ${error}.`);
      throw error;
    }
  }

  static async getSubjectByIdService(subjectId) {
    try {
      console.log(`\n>>> getSubjectByIdService is called`);
      const subject = await Subject.findOne({ subjectId: subjectId });
      return subject;
    } catch (error) {
      console.log(`\n>>> getSubjectByIdService have error:  ${error}.`);
      throw error;
    }
  }

  static async autoGenerateSubjectId() {
    try {
      console.log(`\n>>> autoGenerateSubjectId is called`);
      const lastSubject = await Subject.findOne().sort({ subjectId: -1 });
      if (!lastSubject) return "SJ001";
      const lastId = lastSubject.subjectId;
      // sampled id is "SJ001"
      // lastId.substring(2) => "001"
      // parseInt(lastId.substring(1), 10) => 1 (base 10)
      const lastIdNumber = parseInt(lastId.substring(2), 10);
      const newIdNumber = lastIdNumber + 1;
      // sampled id number = 15
      // newIdNumber.toString() => "15"
      // padStart(3, "0") => "0015"
      const newSubjectId = `SJ${newIdNumber.toString().padStart(3, "0")}`;
      return newSubjectId;
    } catch (error) {
      console.log(`\n>>> autoGenerateSubjectId have error:  ${error}.`);
      throw error;
    }
  }

  static async addSubjectService(newData) {
    try {
      console.log(`\n>>> addSubjectService is called`);
      const subjectId = await this.autoGenerateSubjectId();
      const { name, description } = newData;
      const newSubject = new Subject({
        subjectId,
        name,
        description
      });
      const addedSubject = await newSubject.save();
      return addedSubject;
    } catch (error) {
      console.log(`\n>>> addSubjectService have error:  ${error}.`);
      throw error;
    }
  }

  static async updateSubjectService(subjectId, updatedData) {
    try {
      console.log(`\n>>> updateSubjectService is called`);
      const updatedSubject = await Subject.findOneAndUpdate(
        { subjectId: subjectId },
        updatedData,
        { new: true }
      );
      return updatedSubject;
    } catch (error) {
      console.log(`\n>>> updateSubjectService have error:  ${error}.`);
      throw error;
    }
  }

  static async deleteSubjectService(subjectId) {
    try {
      console.log(`\n>>> deleteSubjectService is called`);
      const deletedSubject = await Subject.findOneAndDelete({
        subjectId: subjectId
      });
      return deletedSubject;
    } catch (error) {
      console.log(`\n>>> deleteSubjectService have error:  ${error}.`);
      throw error;
    }
  }
}

module.exports = SubjectService;

// try {
//  console.log(`\n>>> functionName is called`);
// } catch (error) {
//   console.log(`\n>>> functionName have error:  ${error}.`);
//   throw error
// }
