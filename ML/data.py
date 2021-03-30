import json
import random


def write_file(data):
    with open('data/data.json', 'w') as f:
        json.dump(data, f, indent=4)


def make_random_choice_list(list):
    random_nbr = random.randint(0, len(list) - 1)
    print(random_nbr)
    return list[random_nbr]


def determinate_price(initial_price, best_price, stock, max_stock, month):
    #print(initial_price, best_price, stock, max_stock)
    price = best_price - stock * ((best_price - initial_price) / max_stock)
    if month == 11:
        price = price + 10
    return int(price)


def create_kpi():
    data = []
    data_sample = {
        "country": "",
        "currency":"",
        "region":"",
        "language": "",
        "isPandemicCrisis": "",
        "isEconomicGrowthIncreasing": "",
        "isInCrisis": "",
        "margePrice": "",
        "initialPrice": "",
        "bestPrice": "",
        "meanBasketValue: "","
        "discountedPrice": "",
        "promotionalPrice": "",
        "day": "",
        "isWeekDay": "",
        "isWeekendDay": "",
        "isHoliday": "",
        "isSpecialDay": "",
        "time": "",
        "timeZone": "",
        "inventoryData": "",
        "supplyData": "",
        "dataCustomerReviews": "",
        "dataCompetition": "",
        "socialTrending": "",
        "productCategory": "",
        "productColor": "",
        "bestProductColorByCountry": "",
        "bestLinkProducts": "",
        "hasAlreadyBought": "",
        "isLoyal": "",
        "meanSpending": "",
    }
    for i in range(0, 10):
        data_sample["country"] = "France"
        data_sample["currency"] = "euro"
        data_sample["region"] = "EU"
        data_sample["language"] = "FR"
        data_sample["isPandemicCrisis"] = False
        data_sample["isEconomicGrowthIncreasing"] = True
        data_sample["isInCrisis"] = False
        data_sample["margePrice"] = 10
        data_sample["initialPrice"] = 50
        data_sample["bestPrice"] = 100
        data_sample["meanBasketValue"] = 200
        data_sample["discountedPrice"] = 5
        data_sample["promotionalPrice"] = 5
        data_sample["day"] = "Friday"
        data_sample["isWeekDay"] = True
        data_sample["isWeekendDay"] = False
        data_sample["isHoliday"] = False
        data_sample["isSpecialDay"] = False
        data_sample["time"] = 0
        data_sample["timeZone"] = "UTC"
        data_sample["inventoryData"] = random.randint(1, 100)
        data_sample["supplyData"] = 10
        data_sample["dataCustomerReviews"] = 10
        data_sample["dataCompetition"] = False
        data_sample["socialTrending"] = False
        data_sample["productCategory"] = 0
        data_sample["productColor"] = 0
        data_sample["bestProductColorByCountry"] = 0
        data_sample["bestLinkProducts"] = 0
        data_sample["hasAlreadyBought"] = False
        data_sample["isLoyal"] = False
        data_sample["meanSpending"] = 0
        data_sample['maxStock'] = 100
        data_sample["price"] = determinate_price(data_sample['initialPrice'], data_sample['bestPrice'], data_sample['inventoryData'], data_sample['maxStock'])
        data_end = data_sample.copy()
        data.append(data_end)
    #write_file(data)
    return data


def create_kpi_simplify():
    data = []
    data_sample = {
        "bestPrice": "",
        "inventoryData": "",
        "maxStock": "",
		"intrest": "",
        "month": 0,
        "price": ""
    }
    for i in range(0, 1000):
        data_sample["bestPrice"] = 100
        data_sample["inventoryData"] = random.randint(1, 100)
        data_sample['maxStock'] = 100
        data_sample['month'] = random.randint(0, 11)
        data_sample["price"] = determinate_price(50, data_sample['bestPrice'], data_sample['inventoryData'], data_sample['maxStock'], data_sample['month'])
        data_end = data_sample.copy()
        data.append(data_end)
    write_file(data)
    return data


def create_random_kpi_simplify():
    data = []
    data_sample = {
        "initialPrice": 0,
        "bestPrice": "",
        "mean_basket_price": 0,
        "inventoryData": "",
        "maxStock": "",
        "month": 0,
        "weekDay": 0,
        "hour": 0,
        "isLoyal": 0,
        "price": ""
    }
    for i in range(0, 1000):
        data_sample["initialPrice"] = random.randint(10, 100)
        data_sample["bestPrice"] = data_sample["initialPrice"] + random.randint(10, 100)
        data_sample["mean_basket_price"] = data_sample["bestPrice"] + random.randint(1, 100)
        data_sample["inventoryData"] = random.randint(1, 100)
        data_sample['maxStock'] = random.randint(0, 100)
        data_sample['month'] = random.randint(0, 11)
        data_sample['weekDay'] = random.randint(0, 30)
        data_sample['month'] = random.randint(0, 11)
        data_sample["hour"] = random.randint(0, 23)
        data_sample["isLoyal"] = random.randint(0, 1)
        data_sample["price"] = random.randint(data_sample["initialPrice"], data_sample["bestPrice"])
        data_end = data_sample.copy()
        data.append(data_end)
    #write_file(data)
    return data


if __name__ == '__main__':
    #print(determinate_price(50, 100, 100, 100))
    #create_kpi()
    create_kpi_simplify()