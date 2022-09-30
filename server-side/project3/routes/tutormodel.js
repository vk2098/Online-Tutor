const mongoose = require('mongoose')

const Tutor = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
        subject: { type: String, required: true },
        workinghours: { type: String, required: true },
        aboutthem: { type: String, required: true },
        country: { type: String, required: true },
        
		quote: { type: String },
	},
	{ collection: 'tutor-data' }
)

const model = mongoose.model('TutorData', Tutor)

module.exports = model