const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
  studentId: { type: String, ref: "Student", required: true }, // reference to Subject model
  subjectId: { type: String, ref: "Subject", required: true }, // reference to Student model
  averageScore: { type: Number, required: true }
});

const Grade = mongoose.model("Grade", gradeSchema);
module.exports = Grade;
