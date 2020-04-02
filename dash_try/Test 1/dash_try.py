import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import numpy as np
import plotly.graph_objs as go

def data_normalization(X, q = 0.001):
    q0 = np.quantile(X, q)
    q1 = np.quantile(X, 1 - q)
    X = X[X >= q0]
    X = X[X <= q1]
    return X

def log(X):
    if 0 not in np.unique(X):
        return np.log10(X)
    return X

file_path = "./data.csv"
main_table = pd.read_csv(file_path)

X = {col: log(data_normalization(main_table[col].astype('float'))) for col in list(main_table)}

app = dash.Dash(__name__, meta_tags=[{"name": "viewport", "content": "width=device-width"}])
server = app.server
colors = {
    'background': '#111111',
    'text': '#7FDBFF'
}

features_divs = [html.Div([dcc.Graph(
        figure = {
            'data': [go.Histogram(x = X[col], nbinsx = 10, histnorm='probability density', marker_color = "#98151b")],
            'layout': go.Layout(
                hovermode = "closest",
                autosize = True,
                width = 400,
                title = "Distribution of {}".format(col)
             )
        },
	    config={"displayModeBar": False},
        )], className = "row")  for i in range(30) for col in list(main_table)]

div  = html.Div(id="page-content", children = [
     html.Div([html.H5("Features Distribution")],
                        className="seven columns main-title"),
     html.Div(features_divs, className = "sub_page")], className = "page")

app.layout = html.Div([dcc.Location(id="url", refresh=False), div])

if __name__ == '__main__':
    app.run_server(debug=True)
