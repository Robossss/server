const mongoose = require('mongoose')

const ModuleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: [
        {
            avatar: {
                type: String 
            }
        }
    ]
})

module.exports = mongoose.model('Module', ModuleSchema)
