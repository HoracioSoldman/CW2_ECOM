import json
import random
import pycountry

names_list_man = ["Nicolas", "Horacio", "Jamie", "Josh", "Simon", "Harry", "Ryan"]
names_list_woman = ["Audrey", "Leah", "Emma", "Eva", "Ava", "Diana", "Jade", "Jessica"]

countries_list = ["FRA", "DEU", "GBR", "ITA", "ESP", "BEL"]
categories = ['AIR JORDAN', 'ASICS', 'JORDAN', 'CONVERSE', 'NEW BALANCE', 'NIKE', 'REEBOK', 'UNDER ARMOUR',
              'VANS', 'ADIDAS']

countries_list_pre_processing = {"FRA": 0, "DEU": 1, "GBR": 2, "ITA": 3, "ESP": 4, "BEL": 5}
categories_pre_processing = {'AIR JORDAN': 0, 'ASICS': 1, 'JORDAN': 2, 'CONVERSE': 3, 'NEW BALANCE': 4, 'NIKE': 5, 'REEBOK': 6,
	              'UNDER ARMOUR': 6, 'VANS': 7, 'ADIDAS': 8}

scenarios_profiles = [20, 30, 10, 15, 20, 50, 20, 5, 20, 40]


def write_file(data):
	with open('ML/data/data.json', 'w') as f:
		json.dump(data, f, indent=4)


def load_data():
	with open('data/data.json') as f:
		data = json.load(f)
	return data


def give_name():
	gender = random.randint(0, 1)
	if gender == 1:
		name = names_list_man[random.randint(0, len(names_list_man) - 1)]
		shoeSize = random.randint(39, 51)
		return gender, name, shoeSize
	shoeSize = random.randint(36, 46)
	name = names_list_woman[random.randint(0, len(names_list_woman) - 1)]
	return gender, name, shoeSize


def make_random_choice_list(list):
	random_nbr = random.randint(0, len(list) - 1)
	print(random_nbr)
	return list[random_nbr]


def scenario_random(data_categories, category_name):
	gender, name, shoeSize = give_name()
	country = countries_list[random.randint(0, len(countries_list) - 1)]
	email = name + str(random.randint(0, 10)) + "gmail.com"

	category_nbr = random.randint(0, len(categories) - 1)

	category_name = category_name if category_name else categories[category_nbr]

	category_list = data_categories[categories[category_nbr]]

	shoe_nbr = random.randint(0, len(category_list["results"]) - 1)
	shoe = category_list["results"][shoe_nbr]["name"]

	mostLikedCategory = categories[random.randint(0, len(categories) - 1)]
	whatAlreadyHas = categories[random.randint(0, len(categories) - 1)]
	categoryHistory = categories[random.randint(0, len(categories) - 1)]


	country = countries_list_pre_processing[country]
	category_name = categories_pre_processing[category_name]
	mostLikedCategory = categories_pre_processing[mostLikedCategory]
	whatAlreadyHas = categories_pre_processing[whatAlreadyHas]
	categoryHistory = categories_pre_processing[categoryHistory]

	return name, gender, shoeSize, country, email, category_name, shoe, mostLikedCategory, whatAlreadyHas, categoryHistory


def create_kpi(data_categories):
	data = []
	data_sample = {
		"name": "",
		"email": "",
		"country": "",
		"gender": "",
		"age": "",
		"shoeSize": "",
		"mostLikedCategory": "",
		"whatAlreadyHas": "",
		"categoryHistory": "",
		"categoryChosen": "",
		"shoeChosen": "",
	}
	for i in range(0, 100):
		name, gender, shoeSize, country, email, category_name, shoe_name, mostLikedCategory, whatAlreadyHas, categoryHistory = scenario_random(data_categories, None)
		data_sample["name"] = name
		data_sample["email"] = email
		data_sample["country"] = country
		data_sample["gender"] = gender
		data_sample["age"] = random.randint(16, 50)
		data_sample["shoeSize"] = shoeSize
		data_sample["mostLikedCategory"] = mostLikedCategory
		data_sample["whatAlreadyHas"] = whatAlreadyHas
		data_sample["categoryHistory"] = categoryHistory
		data_sample["categoryChosen"] = category_name
		data_sample["shoeChosen"] = shoe_name
		data_end = data_sample.copy()
		data.append(data_end)

	for nbr in range(len(scenarios_profiles)):
		for i in range(0, scenarios_profiles[nbr]):
			name, gender, shoeSize, country, email, category_name, shoe_name, mostLikedCategory, whatAlreadyHas, categoryHistory = scenario_random(data_categories, categories[nbr])
			data_sample["name"] = name
			data_sample["email"] = email
			data_sample["country"] = country
			data_sample["gender"] = gender
			data_sample["age"] = random.randint(16, 50)
			data_sample["shoeSize"] = shoeSize
			data_sample["mostLikedCategory"] = mostLikedCategory
			data_sample["whatAlreadyHas"] = whatAlreadyHas
			data_sample["categoryHistory"] = categoryHistory
			data_sample["categoryChosen"] = category_name
			data_sample["shoeChosen"] = shoe_name
			data_end = data_sample.copy()
			data.append(data_end)
	return data

if __name__ == '__main__':
	# print(determinate_price(50, 100, 100, 100))
	data_categories = load_data()
	data = create_kpi(data_categories)
	print(data)
	write_file(data)

