const mongoose = require('mongoose')

const ModuleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Module', ModuleSchema)