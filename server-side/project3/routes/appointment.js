var express=require('express');
var router=express.Router();

var bcrypt = require('bcryptjs');
var monk = require('monk');
var db = monk('localhost:27017/project31');
const Appointment = require('../models/appointmentModel')
var collection = db.get('appointments');
const mongoose = require('mongoose')
var auth1=require('../middleware/auth')

mongoose.connect('mongodb://localhost:27017/project31')
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wplonlinetutor16@gmail.com',
      pass: 'Qwerty@20'
    }
  });

db.on('error', console.error.bind(console, 'connection error:'))

router.get('/', function(req, res) {
collection.find({}, function(err, tutors){
if (err) throw err;
 res.json(tutors);
});
});



router.get('/:id',function(req,res){
	console.log(req.params.id)
    collection.find({email:req.params.id},function(err,appointments){
        if (err) throw err;
        res.json(appointments);
    });
});





router.post('/addApp',auth1, async (req, res) => {
	const appointment = await Appointment.findOne({
		email: req.body.email,
        
        appointment:req.body.appointment
	})

    const appointment1=await Appointment.findOne({
		student: req.body.student,
        
        appointment:req.body.appointment
	})
    try{
	if (!appointment) {
        if(!appointment1){
		const newAppointment = new Appointment({
            email: req.body.email,
            student:req.body.student,
            appointment:req.body.appointment
        })
        await newAppointment.save()
        student=req.body.student+""
        var maillist=['wplonlinetutor16@gmail.com',student]
        var mailOptions = {
            from: 'wplonlinetutor16@gmail.com',
            to: maillist,
            subject: 'Appointment Details!!',
            text: 'Appointment Booked!!!'+"\n"+' Tutor Name: '+req.body.email+ "\n "+'Appointment Date & Time:'+req.body.appointment
          };
          transporter.sendMail(mailOptions, function(error, mail){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + mail.response);
            }
          });
        res.json({ status: 'ok' })
	}
    else{
        res.json({ status: 'error' })
    }
}
    else{
        res.json({ status: 'error' })
    }
}
   catch(err)
   {
    res.json({ status: 'error'})
   }

})




//delete
router.delete('/:id',function(req,res){
    collection.remove({_id:req.params.id},function(err,appointments){
        if (err) throw err;
        res.json(appointments);
    });
});






module.exports = router;