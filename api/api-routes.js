let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
	res.json({
		status: 'API Its Working',
		message: 'Welcome to Sneakerbeast crafted with love!'
	});
});

// Import contact controller
const userController = require('./controllers/userController');// Contact routes
const messageController = require('./controllers/messageController');// Contact routes

router.route('/users')
	.get(userController.index)
	.post(userController.new);

router.route('/users/login')
.post(userController.login);

router.route('/users/:userId')
	.get(userController.view)
	.patch(userController.update)
	.put(userController.update)
	.delete(userController.delete);


//Contact

router.route('/contact')
	.get(messageController.index)
	.post(messageController.new);

// Export API routes
module.exports = router;