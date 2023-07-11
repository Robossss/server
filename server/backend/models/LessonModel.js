const mongoose = require('mongoose')

const LessonSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    module:{
        type: mongoose.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Lesson', LessonSchema)