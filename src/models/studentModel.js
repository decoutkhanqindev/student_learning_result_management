const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true, 
    },
    name: {
      type: String,
      reqired: true
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
      }
    ]
  }
)

module.exports = mongoose.model('Student', StudentSchema)