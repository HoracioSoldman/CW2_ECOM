const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	sku: {
		type: String,
		required: true
	},
	brand: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	colorway: {
		type: String
	},
	gender: {
		type: String,
		required: true
	},
	silhouette: {
		type: String,
		required: true
	},
	releaseYear: {
		type: Number
	},
	releaseDate: {
		type: String
	},
	retailPrice: {
		type: Number,
		required: true
	},
	estimatedMarketValue: {
		type: Number
	},
	story: {
		type: String
	},
	image: {
		type: Object
	},

	links: {
		type: Object
	}
});

const Product = module.exports = mongoose.model('product', productSchema);