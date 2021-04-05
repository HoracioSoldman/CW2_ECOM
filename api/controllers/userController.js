const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
// Import user model
User = require('../models/userModel');// Handle index actions

exports.index = function (req, res) {
	User.get(function (err, users) {
		if (err) {
			res.json({
				status: "error",
				message: err,
			});
		}
		res.json({
			status: "success",
			message: "users retrieved successfully",
			data: users
		});
	});
};

exports.new = function (req, res) {
	const {name, email, gender, size, age, whatAlreadyHas, chosenCategories, password} = req.body
	let user = new User({
		name, email, size, age, gender, whatAlreadyHas, chosenCategories, password
	});
	
	
	User.findOne({email: user.email}, (err, usr)=>{
		if(err){
		  res.status(500).send(err);
		}
		else {
			if (usr)
				res.json({
					message: 'THis email address has been already used.',
					data: usr,
					status: "failure"
				});
			else 
				
				user.save(function (errr) {
					if (!errr)
						//sending email confirmation request
						res.json({
							message: 'New user created!',
							data: user,
							status: "success"
						});
					else res.json(errr);

				});
				
		}
	  });

};


exports.login = (req, res)=>{
	const {email, password} = req.body
	
	User.findOne({email},
	   (err, usr)=>{
	  if(err){
		res.status(500).send(err);
	  }
	  else {
		if(usr){
		  if(usr.verifyPassword(password)){
			res.status(200).json({ 
				message: 'Loged in!',
				status: "success",
				data: {
					name: usr.name,
					email: usr.email,
					phone: usr.phone,
					create_date: usr.create_date,
					token: usr.generateJwt() //an updated token
				}
			});
		  }else{
			
			res.status(200).send({
				data: {},
				status: "failure",
				message: 'Invalid Password!' });
		  }
		}else {
		  
		  res.status(200).send({ 
			data: {},
			status: "failure",  
			message: 'Invalid email!' });
		}
	  }
	})
  
  }

exports.view = function (req, res) {
	User.findById(req.params.userId, function (err, user) {
		if (err)
			res.send(err);
		res.json({
			message: 'user details loading..',
			data: user
		});
	});
};

exports.update = function (req, res) {user.findById(req.params.userId, function (err, user) {
	if (err)
		res.send(err);user.name = req.body.name ? req.body.name : user.name;
	user.email = req.body.email;
	user.phone = req.body.phone;// save the user and check for errors
	user.save(function (err) {
		if (err)
			res.json(err);
		res.json({
			message: 'user Info updated',
			data: user
		});
	});
});
};

exports.delete = function (req, res) {
	User.remove({
		_id: req.params.userId
	}, function (err, user) {
		if (err)
			res.send(err);res.json({
			status: "success",
			message: 'user deleted'
		});
	});
};


exports.generate_token = (isForActivation, user_id)=> (
	jwt.sign({ id: user_id }, config.secretKey, 
		isForActivation ? {} : {
			expiresIn: 86400 // expires in 24 hours
		}
	)
) 

