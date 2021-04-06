from sklearn.ensemble import RandomForestClassifier
import data
import pandas
import json
from sklearn.preprocessing import LabelEncoder


def load_data():
	with open('data/data.json') as f:
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


		tmp_country_df = pandas.get_dummies(data['country'])
		self.country_names = list(tmp_country_df)
		data = data.drop('country', axis=1)
		data = data.join(tmp_country_df)

		data['mostLikedCategory'] = data.apply(lambda row: row['mostLikedCategory'] + "_liked", axis=1)
		tmp_categories_liked_df = pandas.get_dummies(data['mostLikedCategory'])
		self.mostLikedCategory_names = list(tmp_categories_liked_df)
		data = data.drop('mostLikedCategory', axis=1)
		data = data.join(tmp_categories_liked_df)

		data['whatAlreadyHas'] = data.apply(lambda row: row['whatAlreadyHas'] + "_has", axis=1)
		tmp_already_has_df = pandas.get_dummies(data['whatAlreadyHas'])
		self.already_has_names = list(tmp_already_has_df)
		data = data.drop('whatAlreadyHas', axis=1)
		data = data.join(tmp_already_has_df)

		print(data)

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

		return category_predicted


	def start_train(self, dataset):

		print('------------------------DATASET------------------------')
		print(dataset)

		#['country', 'gender', 'age', 'mostLikedCategory']
		features = ['gender', 'age'] + self.country_names + self.mostLikedCategory_names + self.already_has_names
		#TODO Add whatAlreadyHas

		print("Feature list : ", features)
		train_0, train_target_0 = self.filter_dataset(dataset, 'categoryChosen', features)
		self.train(train_0, train_target_0)


	def data_pre_processing(self, data):
		country = data[2]
		mostLikedCategory = data[3]
		whatAlreadyHas = data[4]
		for i in range(3):
			data.remove(data[2])

		for i in range(len(self.country_names)):
			if country == self.country_names[i]:
				data.append(1)
			else:
				data.append(0)

		#mostLikedCategory = {"NIKE": 0, "JORDAN": 1, "VANS": 1}
		for i in range(len(self.mostLikedCategory_names)):
			if self.mostLikedCategory_names[i].replace("_liked", "") in mostLikedCategory:
				category_name = self.mostLikedCategory_names[i].replace("_liked", "")
				data.append(mostLikedCategory[category_name])
			else:
				data.append(0)

		for i in range(len(self.already_has_names)):
			if self.already_has_names[i].replace("_has", "") in whatAlreadyHas:
				category_name = self.already_has_names[i].replace("_has", "")
				data.append(whatAlreadyHas[category_name])
			else:
				data.append(0)

		print('------------------------PRE-PROCESSING------------------------')
		print(data)
		return data


if __name__ == '__main__':
	machine_learning = machine_learning()
	data_predict = [0, 21, "FRA", {"cscs": 1}, {"cscs": 1}]
	machine_learning.predict(data_predict)
