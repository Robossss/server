const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    otherName:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enums:['student', 'admin']
    }
})

module.exports = mongoose.model('User', UserSchema)