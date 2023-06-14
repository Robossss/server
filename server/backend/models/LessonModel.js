const mongoose = require('mongoose')

const LessonSchema = mongoose.Schema({
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