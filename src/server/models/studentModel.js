const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    studentId: {
      type: String, // S001
      required: true,
      unique: true
    },
    name: {
      type: String, // Nguyen Van A
      required: true
    },
    major: {
      type: String, // IT
      required: true
    },
    subjectIds: [
      {
        type: String, // [SJ001, SJ002]
        ref: "Subject " // reference to Subject model
      }
    ]
  },
  {
    versionKey: false, // disable __v field
    collection: "student"
  }
);

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;
