const express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require("./api-routes")// Use Api routes in the App

const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/front', { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

if(!db)
	console.log("Error connecting db")
else
	console.log("Db connected successfully")

const port = process.env.PORT || 4000;

app.use('/api', apiRoutes);

app.listen(port, function () {
	console.log("Running Application on port " + port);
});
