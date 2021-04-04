from sklearn.ensemble import RandomForestClassifier
import data
import pandas
import json
from sklearn.preprocessing import LabelEncoder


def load_data():
	with open('ML/data/data.json') as f:
		data = json.load(f)
	return data


def filter_dataset(data_set, predict_class, train_parameters):
	train_target = data_set[[predict_class]]
	train_x = data_set[train_parameters]
	return train_x, train_target


def result(model, train, target, user):
	regressor = model.fit(train, target)
	print("\nScore of model : ", regressor.score(train, target), "\n")

	print("\nThe category chosen : ", regressor.predict(user), "\n")


def predict_category(model, dataset):
	#le = LabelEncoder()
	#dataset['categoryChosen'] = le.fit_transform(dataset['categoryChosen'])
	#dataset['mostLikedCategory'] = le.fit_transform(dataset['mostLikedCategory'])
	# dataset['categoryHistory'] = le.fit_transform(dataset['categoryHistory'])
	#dataset['country'] = le.fit_transform(dataset['country'])

	print(dataset)

	print('------------------------DATASET------------------------')

	data_predict = ['FRA', 0, 21, 'NIKE']
	data_predict = data_pre_processing(data_predict)

	print(data_predict)


	train_0, train_target_0 = filter_dataset(dataset, 'categoryChosen',
	                                         ['country', 'gender', 'age', 'mostLikedCategory'])
	result(model, train_0, train_target_0, [data_predict])


def data_pre_processing(data):
	countries_list = {"FRA": 0, "DEU": 1, "GBR": 2, "ITA": 3, "ESP": 4, "BEL": 5}
	categories = {'AIR JORDAN': 0, 'ASICS': 1, 'JORDAN': 2, 'CONVERSE': 3, 'NEW BALANCE': 4, 'NIKE': 5, 'REEBOK': 6,
	              'UNDER ARMOUR': 6, 'VANS': 7, 'ADIDAS': 8}
	data[0] = countries_list[data[0]]
	data[3] = categories[data[3]]
	return data


if __name__ == '__main__':
	# data_categories = data.load_data()
	# dataset = data.create_kpi(data_categories)
	dataset = load_data()
	rf = RandomForestClassifier()
	print("--------------------------------------------------------------")
	data = pandas.DataFrame(dataset)
	print(data)
	print("\n----------------------- RANDOM FOREST  ---------------------\n")
	predict_category(rf, data)
