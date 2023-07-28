const mongoose = require('mongoose')

const LessonSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    lessons: [
        {
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            images: [
                {
                    avatar: {
                        type: String
                    }
                }
            ],
        }
    ],
    module: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Lessons', LessonSchema)
