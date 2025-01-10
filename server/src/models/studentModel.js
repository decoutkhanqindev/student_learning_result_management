const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectRefSchema = new Schema({
  _id: { type: String, ref: "Subject" } // reference to Subject model
});

const studentSchema = new Schema({
  _id: { type: String, required: true },
  fullName: { type: String, required: true },
  className: { type: String, required: true },
  subjects: [subjectRefSchema]
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
