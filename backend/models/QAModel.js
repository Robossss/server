const mongoose = require("mongoose");

const QASchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
  },
  option4: {
    type: String,
  },
  correctOption: {
    type: Number,
    required: true,
    enums: [1, 2, 3, 4]
  },
  level: {
    type: Number
  }
});


module.exports = mongoose.model('QA', QASchema)
