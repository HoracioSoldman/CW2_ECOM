from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score
from sklearn.neural_network import MLPRegressor
import data
import pandas
import numpy as np
import random
from sklearn.model_selection import GridSearchCV
from sklearn.preprocessing import StandardScaler


def compute_regression():
    return LogisticRegression(multi_class="multinomial", max_iter=100000)


def filter_dataset(data_set, train_parameters):
    train_target = data_set[['price']]
    train_x = data_set[train_parameters]
    return train_x, train_target


def result(model, train, target, product):
    #testing_parameters(model, train, target)
    #exit()
    regressor = model.fit(train, target)
    print("\nScore of model : ", regressor.score(train, target), "\n")


def all_data(model, data, target_price):
    train_0, train_target_0 = filter_dataset(data, ['inventoryData', "bestPrice", "maxStock", "month"])
    result(model, train_0, train_target_0, target_price)


def start_scenario(model):
    print("\n------------------ ALL DATASET ---------------\n")
    all_data(model, data, [[10, 100, 100, 11]])
    print("\n------------------ RANDOM DATASET ---------------\n")


def testing_parameters(model, train, target):
    param_grid = [
        {
            'activation': ['identity', 'logistic', 'tanh', 'relu'],
            'solver': ['lbfgs', 'sgd', 'adam'],
            'max_iter': [10, 100, 1000]
        }
    ]
    searching = GridSearchCV(model, param_grid, cv=3, scoring='accuracy')
    searching.fit(train, target)
    print("Best parameters set found on development set:", searching.best_params_)


def shopify_products(model, products_data):
    train_0, train_target_0 = filter_dataset(products_data, ['bestPrice', 'inventoryData', 'maxStock', 'month'])
    result(model, train_0, train_target_0, [[4, 19, 0, 0, 10]])


def get_price_random_forest(model, previous_orders, new_product):
    print(previous_orders)
    train, target = filter_dataset(previous_orders, ['month', 'basket_price', 'isPandemicCrisis', 'isLoyal', 'customer_type', "trends", "isLimitedEdition"])
    model.fit(train, target)
    price = model.predict(new_product)
    return price


if __name__ == '__main__':
    dataset = data.create_kpi_simplify()
    rf = RandomForestRegressor(n_estimators=1000, random_state=0)
#clf = MLPClassifier(solver='adam', alpha=1e-10, random_state=0, hidden_layer_sizes=(4, 5))
    #clf = MLPRegressor(solver='lbfgs', max_iter=1000, random_state=1, tol=0.1, n_iter_no_change=20)
    #clf = MLPRegressor(solver='lbfgs', hidden_layer_sizes=[100], max_iter=2000000)
    clf = MLPRegressor(solver='lbfgs', random_state=0)
    print("--------------------------------------------------------------")
    data = pandas.DataFrame(dataset)
    #print(data)
    print(data)
    print("\n----------------------- RANDOM FOREST  ---------------------\n")
    shopify_products(rf, data)
    print("\n----------------------- NEURAL NETWORK  ---------------------\n")
    shopify_products(clf, data)



