var express=require('express');
var router=express.Router();
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var monk = require('monk');
var db = monk('localhost:27017/project31');
const Users = require('../models/tutorModel')
var collection = db.get('users');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/project31') 

db.on('error', console.error.bind(console, 'connection error:'))

router.get('/', function(req, res) {
collection.find({}, function(err, tutors){
if (err) throw err;
 res.json(tutors);
});
});



router.get('/:id',function(req,res){
    collection.find({email:req.params.id},function(err,tutors){
        if (err) throw err;
        res.json(tutors);
    });
});


//insert






router.post('/signup', async (req, res) => {
    const user = await Users.findOne({
		email: req.body.email,
	})

	if (user) {
		return res.json({ status: 'error', error: 'Email Already Exists!' })
	}
    if(!req.body.email||!req.body.name||!req.body.password||!req.body.subject||!req.body.workinghours||!req.body.aboutthem||!req.body.country)
    {
        return res.json({ status: 'error', error: 'Enter All the details!' })
    }
	console.log(req.body) 
	   password=req.body.password;
       email=req.body.email;
        var regex_pattern = /(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
                if(!(regex_pattern.test(password)))
                {
            return res.json({status:'error',error: 'Password Should contain atleast one uppercase, number and special character'}) 

                }
        

                var regex_pattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/;
                        if(!(regex_pattern.test(email)))
                        {
                           return res.json({status:'error',error: "Email should contain only alphanumeric"})    
                        }
                        try{
		const newPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new Users({
            name: req.body.name,
			email: req.body.email,
			password: newPassword,
            subject:req.body.subject,
            workinghours:req.body.workinghours,
            aboutthem:req.body.aboutthem,
            country:req.body.country,
            img:''
        })
        await newUser.save()
		// await Users.create({
		// 	name: req.body.name,
		// 	email: req.body.email,
		// 	password: newPassword,
        //     subject:req.body.subject,
        //     workinghours:req.body.workinghours,
        //     aboutthem:req.body.aboutthem,
        //     country:req.body.country,
        //     img:''

		// })
        // var token = jwt.sign({ id: newUser._id, email}, 'secretkey');

        // if (token){
        //    newUser.token = token;

        // }
        const accesstoken = createAccessToken({id: newUser.email})
		res.json({ status: 'ok' ,accesstoken})

	} catch (err) {
		return res.json({ status: 'error', error: 'Enter All the details!' })
	}
})










router.post('/signin', async (req, res) => {
	const user = await Users.findOne({
		email: req.body.email,
	})

	if (!user) {
	  return res.json({ status: 'error', error: 'Invalid username' })
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
        const accesstoken = createAccessToken({id: user.email})
		 res.json({ status: 'ok' ,accesstoken})
	} else {
		return res.json({ status: 'error',error:'Wrong Password'})
	}
})



//update
router.put('/:id',function(req,res){
    console.log(req.body)
    collection.update({email:req.params.id},{$set:{
        
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
            subject:req.body.subject,
            workinghours:req.body.workinghours,
            aboutthem:req.body.aboutthem,
            country:req.body.country,
            img:req.body.img

           

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




const createAccessToken = (user) =>{
    return jwt.sign(user, 'secretkey')
}

module.exports = router;