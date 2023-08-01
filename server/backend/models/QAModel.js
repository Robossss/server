const mongoose = require("mongoose");

const QASchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      option: {
        type: String
      }
      
    }
  ],
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
