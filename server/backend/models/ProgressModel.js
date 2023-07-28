const mongoose = require('mongoose')

const ProgressSchema = new mongoose.Schema({
    level: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Module'
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    progressType: {
        type: String,
        enum: ['In Progress', 'Completed'],
        default: 'In Progress'
    },
    progress: {
        type: Number,
        default: 0
    }
})

// Create a compound index on level and user fields
ProgressSchema.index({ level: 1, user: 1 }, { unique: true });
// Pre-save hook
ProgressSchema.pre('save', function (next) {
    if (this.progress >= 100) {
        this.progressType = 'Completed';
        this.progress = 100
    }
    if (this.progress < 100) {
      this.progressType = 'In Progress';
    }
    next();
  });
module.exports = mongoose.model('Progress', ProgressSchema)