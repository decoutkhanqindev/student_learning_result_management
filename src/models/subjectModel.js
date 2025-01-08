const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  avg: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Subject", SubjectSchema);
