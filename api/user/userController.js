// Import user model
User = require('./userModel');// Handle index actions

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
	var user = new User();
	user.name = req.body.name ? req.body.name : user.name;
	user.email = req.body.email;
	user.phone = req.body.phone;// save the user and check for errors
	user.save(function (err) {
		if (err)
			res.json(err);
		res.json({
			message: 'New user created!',
			data: user
		});
	});
};

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
