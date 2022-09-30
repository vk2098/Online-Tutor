const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    student: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        
    },
    rating: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Feedback', feedbackSchema)