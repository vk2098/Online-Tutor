var express=require('express');
var router=express.Router();

var bcrypt = require('bcryptjs');
var monk = require('monk');
var db = monk('localhost:27017/project31');
const Favourites = require('../models/favouriteModel')
var collection = db.get('favourites');
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
    collection.find({student:req.params.id},function(err,favourites){
        if (err) throw err;
        res.json(favourites);
    });
});









router.post('/addtowishlist',auth1, async (req, res) => {
	const user = await Favourites.findOne({
		email: req.body.email,
        student:req.body.student
	})

	if (user) {
        console.log("hi"+user)
		res.json({ status: 'error', error: 'Already added to favourites' })
	}

     else{
         try{
        await Favourites.create({
            student:req.body.student,
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
            subject:req.body.subject,
            workinghours:req.body.workinghours,
            aboutthem:req.body.aboutthem,
            country:req.body.country,
            img:req.body.img

		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Error adding to favourites' })
	}
     }
})

//{ status: 'error', error: 'Error adding to favourites' 













// //update
// router.put('/:id',function(req,res){
//     console.log(req.body)
//     collection.update({email:req.params.id},{$set:{
        
// 			name: req.body.name,
// 			email: req.body.email,
// 			password: req.body.password,
//             subject:req.body.subject,
//             workinghours:req.body.workinghours,
//             aboutthem:req.body.aboutthem,
//             country:req.body.country,
//             img:req.body.img

           

//     }},function(err,tutor)
//     {
//         if(err) throw err;
//         res.json({ status: 'ok'})
//     });
// });








// router.delete('removefromwishlist/:id', (req, res) =>{
//     try {

//         collection.remove({_id:req.params.id})
// }
// catch(err)
// {
//    return res.json(err)
// }
// })

router.delete('/:id',function(req,res){
    collection.remove({_id:req.params.id},function(err,tutors){
        if (err) throw err;
        res.json({ status: 'ok' })
    });
});

module.exports = router;