import flask
from flask import request
from flask_cors import CORS
import main

app = flask.Flask(__name__)
CORS(app)

machine_learning = main.machine_learning()

@app.route('/predict', methods=['OPTIONS', 'POST'])
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

from waitress import serve
serve(app, host="0.0.0.0", port=4102)
print('ML server listening on 4102')
# app.run(host='0.0.0.0', port=4102)
# app.run(port=4102)
