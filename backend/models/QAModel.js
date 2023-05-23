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
    type: String,
    required: true
  },
  level: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Module'
  }
});


module.exports = mongoose.model('QA', QASchema)
