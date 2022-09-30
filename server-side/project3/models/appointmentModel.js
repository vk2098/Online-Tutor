const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    student: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        
    },
   appointment:{
       type:Date,
       required:true,
   }

}, {
    timestamps: true
})

module.exports = mongoose.model('Appointment', appointmentSchema)