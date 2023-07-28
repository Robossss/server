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
                
            },
            content: {
                type: String,
                
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
