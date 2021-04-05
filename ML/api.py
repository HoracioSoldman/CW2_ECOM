import flask
from flask import request
import main

app = flask.Flask(__name__)
app.config["DEBUG"] = True

machine_learning = main.machine_learning()


@app.route('/predict', methods=['POST'])
def home():
	country = request.form.get('country')
	gender = request.form.get('gender')
	age = request.form.get('age')
	mostLikedCategory = request.form.get('mostLikedCategory')
	whatAlreadyHas = request.form.get('whatAlreadyHas')
	data_predict = [gender, age, country, mostLikedCategory, whatAlreadyHas]
	return str(machine_learning.predict(data_predict))

app.run()
