from sklearn.ensemble import RandomForestClassifier
import data
import pandas
import json
from sklearn.preprocessing import LabelEncoder


def load_data():
	with open('ML/data/data.json') as f:
		data = json.load(f)
	return data

class machine_learning():
	def __init__(self, filename=None):
		self.model = None
		dataset = load_data()
		if dataset is None:
			data_categories = data.load_data()
			dataset = data.create_kpi(data_categories)
		print("\n----------------------- RANDOM FOREST  ---------------------\n")
		self.rf = RandomForestClassifier()
		data = pandas.DataFrame(dataset)
		self.start_train(data)


	def filter_dataset(self, data_set, predict_class, train_parameters):
		train_target = data_set[[predict_class]]
		train_x = data_set[train_parameters]
		return train_x, train_target


	def train(self, train, target):
		self.model = self.rf.fit(train, target)
		print("\nScore of model : ", self.model.score(train, target), "\n")


	def predict(self, user):
		user = self.data_pre_processing(user)
		category_predicted = self.model.predict([user])
		print("\nThe category chosen : ", category_predicted, "\n")
		#TODO Put alpha instead of nbr
		return category_predicted


	def start_train(self, dataset):
		#le = LabelEncoder()
		#dataset['categoryChosen'] = le.fit_transform(dataset['categoryChosen'])
		#dataset['mostLikedCategory'] = le.fit_transform(dataset['mostLikedCategory'])
		# dataset['categoryHistory'] = le.fit_transform(dataset['categoryHistory'])
		#dataset['country'] = le.fit_transform(dataset['country'])


		print('------------------------DATASET------------------------')
		print(dataset)

		train_0, train_target_0 = self.filter_dataset(dataset, 'categoryChosen',
		                                         ['country', 'gender', 'age', 'mostLikedCategory'])
		self.train(train_0, train_target_0)


	def data_pre_processing(self, data):
		countries_list = {"FRA": 0, "DEU": 1, "GBR": 2, "ITA": 3, "ESP": 4, "BEL": 5}
		categories = {'AIR JORDAN': 0, 'ASICS': 1, 'JORDAN': 2, 'CONVERSE': 3, 'NEW BALANCE': 4, 'NIKE': 5, 'REEBOK': 6,
		              'UNDER ARMOUR': 6, 'VANS': 7, 'ADIDAS': 8}
		data[0] = countries_list[data[0]]
		data[3] = categories[data[3]]
		return data


if __name__ == '__main__':
	machine_learning = machine_learning()
	data_predict = ['FRA', 0, 21, 'NIKE']
	machine_learning.predict(data_predict)
