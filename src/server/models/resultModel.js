const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema(
  {
    resultId: {
      type: String, // R001
      required: true,
      unique: true
    },
    studentId: {
      type: String, // S001
      required: true,
      ref: "Student" // Reference to Student model
    },
    subjectId: {
      type: String, // SJ001
      required: true,
      ref: "Subject" // Reference to Subject model
    },
    regularExam: {
      type: Number, // 7
      required: true,
      min: 0, // minimum grade
      max: 10 // maximum grade
    },
    middleExam: {
      type: Number, // 5.5
      required: true,
      min: 0, // minimum grade
      max: 10 // maximum grade
    },
    finalExam: {
      type: Number, // 6.5
      required: true,
      min: 0, // minimum grade
      max: 10 // maximum grade
    },
    avgScore: {
      type: Number, // (7 + 5.5 + 6.5) / 3 = 6.3
      required: false // automatically calculated
    }
  },
  {
    versionKey: false,
    collection: "result"
  }
);

const resultModel = mongoose.model("Result", resultSchema);

module.exports = resultModel;
