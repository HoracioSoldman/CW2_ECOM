const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    
    name: {type: String, required: true},
    subject: {type: String, required: true},
    contact: {type: String, required: true},
    message: {type: String, required: true},
    time: {type: Date, default: Date.now()}
})
//Export the model
module.exports = mongoose.model('Message', messageSchema);