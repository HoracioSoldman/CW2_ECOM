var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

var userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	create_date: {
		type: Date,
		default: Date.now
	}, 
	is_active: {
		type: Boolean,
		default: false
	},
	token: String,
	profile: String,
	password: { type: String, required: true },
    salt: { type: String },
    gender: { type: String },
	age: {type: Number},
	size: {type: Number},
	whatAlreadyHas: {type: Array},
	chosenCategories: {type: Array},
	chosenShoes: {type: String, default: ""}
	
});

// Events
userSchema.pre('save', function (next) {
    console.log('Pre Save...');
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, password) => {
            this.password = password;
            this.salt = salt;
            next();
        });
    });
	this.generateJwt()
});


// Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {

    const tkn = jwt.sign({ _id: this._id }, config.secretKey, 
		{ expiresIn: 86400 }// expires in 24 hours 
	)
	this.token = tkn
	return tkn
}


var User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit) {
	User.find(callback).limit(limit);
}