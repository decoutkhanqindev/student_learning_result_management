const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema(
  {
    subjectId: {
      type: String, // SJ001
      required: true,
      unique: true
    },
    name: {
      type: String, // Mang may tinh
      required: true
    },
    description: {
      type: String, // Mang may tinh la mon hoc ...
      required: true
    }
  },
  {
    versionKey: false, // disable __v field
    collection: "subject"
  }
);

const subjectModel = mongoose.model("Subject", subjectSchema);

module.exports = subjectModel;
