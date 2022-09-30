const mongoose = require('mongoose')

const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    workinghours: {
        type: String,
        required: true
    },
    aboutthem: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
        
    },
    img:{
        type: String
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Users', tutorSchema)