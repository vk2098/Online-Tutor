const mongoose = require('mongoose')

const favouriteSchema = new mongoose.Schema({
    student:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        
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

module.exports = mongoose.model('Favourite', favouriteSchema)




// const mongoose = require('mongoose')
// const favouriteSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     student : {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'student'},
//     name : {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'name'},
//     email : {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'email'},
//     password : {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'password'},
//     subject : {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'subject'},
//     workinghours : {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'workinghours'},
//     aboutthem : {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'aboutthem'},
//     country : {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'country'},
//     img : {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'img'},
    
// });
// module.exports = mongoose.model('Favourite',favouriteSchema);