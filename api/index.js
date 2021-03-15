const express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const apiRoutes = require("./api-routes")// Use Api routes in the App

const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//Database connection
switch(process.env.NODE_ENV){
	case 'dev':
		mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, 
			{ useNewUrlParser: true, useUnifiedTopology: true}
		)
	break
	case 'prod':
		mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&w=1`,	
				{ useNewUrlParser: true, useUnifiedTopology: true}
			)
	break
}

let db = mongoose.connection

if(!db)
	console.log("Error connecting db")
else
	console.log("DB connected successfully")

const port = process.env.PORT || 4101;

app.use('/api', apiRoutes);

//Make the built frontend readable 
app.use(express.static(path.join(__dirname, '../front/build')));


app.get('**', (req, res) => {
  return res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
});

app.listen(port, function () {
	console.log("Running Application on port " + port);
});
