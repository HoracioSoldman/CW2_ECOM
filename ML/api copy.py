import flask
from flask import request
from flask_cors import CORS, cross_origin
import main

app = flask.Flask(__name__)
CORS(app, resources={ r'/*': {'origins': '*'}}, supports_credentials=True)

machine_learning = main.machine_learning()

@app.route('/predict', methods=['POST', 'OPTIONS'])
def home():
	country = request.form.get('country')
	gender = request.form.get('gender')
	age = request.form.get('age')
	mostLikedCategory = request.form.get('mostLikedCategory')
	whatAlreadyHas = request.form.get('whatAlreadyHas')
	print(country)
	print(whatAlreadyHas)
	print(mostLikedCategory)
	data_predict = [gender, age, country, eval(mostLikedCategory), eval(whatAlreadyHas)]
	return str(machine_learning.predict(data_predict))

app.run(port=4102)
