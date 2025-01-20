const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema(
  {
    _id: { type: String, required: true },
    subjectName: { type: String, required: true },
    teacher: { type: String, required: true },
    students: [{ type: String, ref: "Student" }] // reference to Student model
  },
  { versionKey: false }
);

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
