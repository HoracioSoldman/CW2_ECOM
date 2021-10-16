import json
import random
import requests


def write_file(data):
    with open('data.json', 'w') as f:
        json.dump(data, f, indent=4)


def get_sneakers(brand_name):
    response = requests.get("https://api.thesneakerdatabase.dev/v2/sneakers?limit=50&name=nike&brand=" + brand_name)
    return response.json()


if __name__ == '__main__':
	data = {}
	brands = ["AIR JORDAN", "ASICS", "JORDAN", "CONVERSE", "NEW BALANCE", "NIKE", "REEBOK", "SAUCONY", "UNDER ARMOUR", "VANS", "YEEZY", "ADIDAS"]
	for brand in brands:
		response = get_sneakers(brand)
		data[brand] = response
	write_file(data)
