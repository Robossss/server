const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    module: {
        type: mongoose.Types.ObjectId,
        ref: 'Module'
    },
    videoUrl: {
        type: String
    }
})

module.exports = mongoose.model('Video', videoSchema)