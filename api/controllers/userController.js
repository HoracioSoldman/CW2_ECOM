const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const config = require('../config');
const axios = require('axios');
const qs = require('querystring');

// Import user model
User = require('../models/userModel');// Handle index actions
Product = require('../models/productModel');// Handle index actions

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
	const {name, email, gender, size, age, country, whatAlreadyHas, chosenCategories, password} = req.body
	let user = new User({
		name, email, size, age, gender, country, whatAlreadyHas, chosenCategories, password
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
							data: {
								name: user.name,
								email: user.email,
								create_date: user.create_date,
								token: user.generateJwt(), //an updated token
								age: user.age,
								size: user.size,
								gender: user.gender,
								country: user.country,
								whatAlreadyHas: user.whatAlreadyHas,
								chosenCategories: user.chosenCategories,
								chosenShoes: user.chosenShoes
							},
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
				message: 'Logged in!',
				status: "success",
				data: {
					name: usr.name,
					email: usr.email,
					create_date: usr.create_date,
					token: usr.generateJwt(), //an updated token
					age: usr.age,
					size: usr.size,
					gender: usr.gender,
					country: usr.country,
					whatAlreadyHas: usr.whatAlreadyHas,
					chosenCategories: usr.chosenCategories,
					chosenShoes: usr.chosenShoes
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


  exports.check = (req, res)=>{
    if(!res.locals.the_id) res.status(401).send({message: 'Invalid token !'})
    User.findOne({_id: res.locals.the_id}, (err, user)=>{
		if (err)
			res.send(err);
		res.json({
			message: 'Corresponding user ',
			data: user,
			status: "success"
		});
    });
}

exports.purchased =  (req, res)=> {
	const {email, whatAlreadyHas} = req.body

	User.findOneAndUpdate({email}, {$set:{whatAlreadyHas}},
		{new: true}, (ee, usr)=>{
		if(ee){
			res.status(200).send({
				data: {},
				status: "failure",
				message: 'Unable to update!' });
		  	
		}else{
			res.status(200).json({ 
				message: 'Update complete!',
				status: "success",
				data: {
					name: usr.name,
					email: usr.email,
					create_date: usr.create_date,
					token: usr.generateJwt(), //an updated token
					age: usr.age,
					size: usr.size,
					gender: usr.gender,
					country: usr.country,
					whatAlreadyHas: usr.whatAlreadyHas,
					chosenCategories: usr.chosenCategories,
					chosenShoes: usr.chosenShoes
				}
			});
		}
	})
}

exports.recommend = (req, resp)=>{	

	const {email} = req.body
	User.findOne({email},
		(err, usr)=>{
	   if(err){
			resp.status(200).send({ 
				data: {},
				status: "failure",  
				message: err.message 
			});
		
	   }
	   else {
		 if(usr){
			const user_data = exports.format_user_data(usr)
			const config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			};
			const categories_names = ["Air Jordan", 'ASICS', 'Jordan', 'Converse', 'New Balance', 'Nike', 'Reebok', 'Under Armour', 'Vans', "adidas"]
			
			// axios.post('http://ml-app:4102/predict', qs.stringify(user_data), config)
			axios.post('http://localhost:4102/predict', qs.stringify(user_data), config)
			// axios.post('http://198.44.96.161:4102/predict', qs.stringify(user_data), config)
			.then((res) => {
				console.log('PREDICTED BRAND: ', res.data);
				const brand = categories_names[res.data[0]]

				Product.find({brand}, (err, shoes)=>{
						if(err){
							resp.status(200).send({ 
								data: {},
								status: "failure",  
								message: err.message 
							});
						}
						else resp.json({
							status: "success",
							message: `List of ${brand} shoes.`,
							data: shoes,
							brand
						});
					})

			}).catch((err) => {
				console.error(err);
				console.log(err);
				resp.send(err)
			});
		 }else {
			resp.status(200).send({ 
				data: {},
				status: "failure",  
				message: 'Invalid email!' 
			});
		 
		 }
		}
	})

	// const data = {
	// 	age: 27,
	// 	country: "GBR",
	// 	gender: 1,
	// 	mostLikedCategory: JSON.stringify({"AIR JORDAN":0,"ASICS":0,"JORDAN":1,"CONVERSE":0,"NEW BALANCE":1,"NIKE":0,"REEBOK":1,"UNDER ARMOUR":0,"VANS":0,"ADIDAS":0}),
	// 	whatAlreadyHas: JSON.stringify({"AIR JORDAN":1,"ASICS":1,"JORDAN":0,"CONVERSE":0,"NEW BALANCE":1,"NIKE":0,"REEBOK":1,"UNDER ARMOUR":0,"VANS":1,"ADIDAS":1})
	// };

	// // set the headers
	// const config = {
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded'
	// 	}
	// };


	// axios.post('http://localhost:4102/predict', qs.stringify(data), config)
    // .then((res) => {
    //     console.log(`Status: ${res.status}`);
    //     console.log('Body: ', res.data);

	// 	// const categories_names = ['AIR JORDAN', 'ASICS', 'JORDAN', 'CONVERSE', 'NEW BALANCE', 'NIKE', 'REEBOK', 'UNDER ARMOUR', 'VANS', 'ADIDAS']	
	
	// 	// Product.find({brand: formatted_brand}, (err, shoes)=>{
	// 	// 	if(err){
	// 	// 	  res.status(500).send(err);
	// 	// 	}
	// 	// 	else res.json({
	// 	// 		status: "success",
	// 	// 		message: `List of ${formatted_brand} shoes.`,
	// 	// 		data: shoes,
	// 	// 		brand: formatted_brand
	// 	// 	});
	// 	// })

	// 	resp.send(res.data)
    // }).catch((err) => {
    //     console.error(err);
	// 	console.log(err);
	// 	resp.send(err)
    // });



	// const request = require('request');
	// const options = {
	// 	url: 'http://localhost:4102/predict',
	// 	form: {
	// 			age: 27,
	// 			country: "GBR",
	// 			gender: "M",
	// 			mostLikedCategory: {"AIR JORDAN":0,"ASICS":0,"JORDAN":1,"CONVERSE":0,"NEW BALANCE":1,"NIKE":0,"REEBOK":1,"UNDER ARMOUR":0,"VANS":0,"ADIDAS":0},
	// 			whatAlreadyHas: {"AIR JORDAN":1,"ASICS":1,"JORDAN":0,"CONVERSE":0,"NEW BALANCE":1,"NIKE":0,"REEBOK":1,"UNDER ARMOUR":0,"VANS":1,"ADIDAS":1}
	// 		}
	// };
	
	// request.post(options, (err, resp, body) => {
	// 	if (err) {
	// 		console.log(err);
	// 			res.send(err)
	// 	}else{
	// 		console.log(resp)
	// 		console.log(JSON.parse(body));
	// 			res.send(body)
	// 	}
	// });
	// axios
	// .post('http://localhost:4102/predict', {
	// 	age: 27,
	// 	country: "GBR",
	// 	gender: "M",
	// 	mostLikedCategory: {"AIR JORDAN":0,"ASICS":0,"JORDAN":1,"CONVERSE":0,"NEW BALANCE":1,"NIKE":0,"REEBOK":1,"UNDER ARMOUR":0,"VANS":0,"ADIDAS":0},
	// 	whatAlreadyHas: {"AIR JORDAN":1,"ASICS":1,"JORDAN":0,"CONVERSE":0,"NEW BALANCE":1,"NIKE":0,"REEBOK":1,"UNDER ARMOUR":0,"VANS":1,"ADIDAS":1}
	// })
	// .then((resp) => {
		
	// 	console.log(resp)
	// 	res.send(resp)
	// })
	// .catch((error) => {
	// 	console.error(error)
	// 	res.send(error)
	// })
}

exports.format_user_data = user=> {
	const convert_brands_values = arr=>{
		const categories = ['AIR JORDAN', 'ASICS', 'JORDAN', 'CONVERSE', 'NEW BALANCE', 'NIKE', 'REEBOK', 'UNDER ARMOUR', 'VANS', 'ADIDAS']
        let formatted = {}
        
        arr.forEach((val, i)=>{
            formatted[categories[i]] = val
        })
        return JSON.stringify(formatted)
    }

	const {country, gender, age, size, chosenCategories, whatAlreadyHas} = user
	const userdata = {
		country, gender: gender === 'M' ? 1 : 0, age, mostLikedCategory: convert_brands_values(chosenCategories),
		whatAlreadyHas: convert_brands_values(whatAlreadyHas)
	}
	return userdata
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
	jwt.sign({ id: user_id }, process.env.SECRET_KEY, 
		isForActivation ? {} : {
			expiresIn: 86400 // expires in 24 hours
		}
	)
) 

