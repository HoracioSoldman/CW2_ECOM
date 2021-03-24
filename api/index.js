const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const apiRoutes = require("./api-routes")// Use Api routes in the App

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

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