import numpy as np
import pandas as pd
import plotly.graph_objects as go
import random
import json
from flask import jsonify

def data_normalization(x, q=0.001):
    q0 = np.quantile(x, q)
    q1 = np.quantile(x, 1 - q)
    x = x[x > q0]
    x = x[x < q1]
    return x

def custom_chi2(X, Y):
    n1 = X.sum()
    n2 = Y.sum()
    summa = 0
    for i in range(len(X)):
        summa += (n1 * Y[i] - n2 * X[i]) ** 2 / (X[i] + Y[i])
    return summa / (n1 * n2)

def categorical_histogram(x):
    unique, counts = np.unique(x, return_counts=True)
    return unique, counts


features = []
nbins = 20
months_bins = 10
months = 10
event_rate_bins = 5
for name in ["amt_credit", "days_birth", "name_educational", "max_overdue", "cnt_children", "amt_annuity", "amt_income_total", "cnt_children", "organization_type", "days_employed", "days_registration"]:
    feature = {
        "name": name,
        "distribution_stability": random.random(),
        "event_rate_stability": random.random(),
        "hist": [random.randint(0, 100) for i in range(nbins)],
        "months_hist": [[random.randint(0, 100) for i in range(months_bins)] for i in range(months)],
        "month_count": [random.randint(1000, 60000) for i in range(months)],
        "p_values_distribution": [random.random() for i in range(months)],
        "p_values_event_rate": [[random.random() for j in range(months)] for i in range(event_rate_bins)]
    }
    features.append(feature)

with open("./data/data_quality.json", "w") as write_file:
    json.dump(features, write_file, indent=2)
