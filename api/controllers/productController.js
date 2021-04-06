const Product = require('../models/productModel');
const Data = require('../../data/data.json')

exports.importation = (req, res)=>{
	let shoes = []
	for(let [key, value] of Object.entries(Data)){
		let branded = value
		const results = [...branded['results']]
		results.forEach(sh=>{
			let pairOfShoes = {...sh}
			pairOfShoes._id = sh.id

			if(sh.retailPrice === 0){
				//if the price is not specified, we randomly assign one between 50 to 300
				pairOfShoes.retailPrice = Math.floor(Math.random() * 300) + 50;
			}

			if(!sh.story){
				pairOfShoes.story = 'No story available.'
			}

			shoes.push(pairOfShoes)
		})
		
	}

	if(shoes.length > 0){
		Product.insertMany(shoes)
		.then(function(){
			res.json({
				status: "success",
				message: `${shoes.length} shoes inserted.`,
				data: shoes
			});
		}).catch(function(error){
			res.json({
				status: "failure",
				data: error,
				message: 'An error has occured.'
			});      
		});
	}
	
}

exports.branded = function (req, res) {
	const brands_dico = {
		"air-jordan": "Air Jordan",
		"adidas": "adidas",
		"asics": "ASICS",
		"jordan": "Jordan",
		"converse": "Converse",
		"new-balance": "New Balance",
		"nike": "Nike",
		"reebok": "Reebok",
		"under-armour": "Under Armour",
		"vans": "Vans"
	}
	const {brand} = req.body
	if(!brand)
		return res.json({
			status: "failure",
			data: {},
			message: 'Please specifya  brand.'
		});
	
	const formatted_brand = brands_dico[brand]
	if(!formatted_brand)
		return res.json({
			status: "failure",
			data: {},
			message: `Brand "${brand}" unformatted.`
		});


	Product.find({brand: formatted_brand}, (err, shoes)=>{
		if(err){
		  res.status(500).send(err);
		}
		else res.json({
			status: "success",
			message: `List of ${formatted_brand} shoes.`,
			data: shoes,
			brand: formatted_brand
		});
	})

};
