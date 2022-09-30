var express=require('express');
var router=express.Router();

var bcrypt = require('bcryptjs');
var monk = require('monk');
var db = monk('localhost:27017/project31');
const Feedback = require('../models/feedbackModel')
var collection = db.get('feedbacks');
const mongoose = require('mongoose')
var auth1=require('../middleware/auth')

mongoose.connect('mongodb://localhost:27017/project31')

db.on('error', console.error.bind(console, 'connection error:'))

router.get('/', function(req, res) {
collection.find({}, function(err, tutors){
if (err) throw err;
 res.json(tutors);
});
});



router.get('/:id',function(req,res){
	console.log(req.params.id)
    collection.find({email:req.params.id},function(err,tutors){
        if (err) throw err;
        res.json(tutors);
    });
});








router.post('/addreview',auth1, async (req, res) => {
	console.log(req.body)
	   
       
        try{
		await Feedback.create({
			student: req.body.student,
			email: req.body.email,
			rating:req.body.rating,
			comment:req.body.comment
            
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Error adding the review!' })
	}
})











//update
router.put('/:id',function(req,res){
    console.log(req.body)
    collection.update({email:req.params.id},{$set:{
        
			name: req.body.name,
			email: req.body.email,
			password: req.body.password

           

    }},function(err,tutor)
    {
        if(err) throw err;
        res.json({ status: 'ok'})
    });
});






//delete
router.delete('/:id',function(req,res){
    collection.remove({_id:req.params.id},function(err,tutors){
        if (err) throw err;
        res.json(tutors);
    });
});






module.exports = router;