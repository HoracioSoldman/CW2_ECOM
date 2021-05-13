const Message = require('../models/messageModel');

exports.index = function (req, res) {
	Message.get(function (err, ms) {
		if (err) {
			res.json({
				status: "failure",
				data: err,
                message: 'An error has occured.'
			});
		}
		res.json({
			status: "success",
			message: "Messages retrieved successfully",
			data: ms
		});
	});
};

exports.new = function (req, res) {
	const {name, contact, subject, message} = req.body
	let m = new Message({
		name, contact, subject, message
	});
					
    m.save(function (errr) {
        if (!errr)
            res.json({
                message: 'Message sent successfully!',
                data: m,
                status: "success"
            });
        else res.json({
                message: 'Failed to send the Message, please try again',
                data: errr,
                status: "failure"
        });

    });


};

