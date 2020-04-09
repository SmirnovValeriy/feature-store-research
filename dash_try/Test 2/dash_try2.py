# -*- coding: utf-8 -*-import dash
import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import numpy as np
import plotly.graph_objs as go
from dash.dependencies import Input, Output, State
import base64
import datetime
import io
import dash_table


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

app = dash.Dash(__name__, meta_tags=[{"name": "viewport", "content": "width=device-width"}])
server = app.server

# app.layout = html.Div([dcc.Location(id="url", refresh=False), html.Div(id="page-content", children = 
#     [
#         html.Div([html.Div([html.H5("Features Distribution")],
#                         className="seven columns main-title")], className = "row"),
#         html.Div([html.Div([
#             html.Div([html.Br(), 
#                       html.I("Insert path to csv - file to see features distribution grphics"), 
#                       html.Br()], className = "row", style = {
#                           'font-size': '20px',
#                           'text-align': 'center',
#                           'font-family': 'curssive'
#                       }), 
#             html.Div([dcc.Input(id="input1", type="text", placeholder="")], className = "row")], className = "product",
#         style = {'font-size': '20px', 'text-align': 'center'})], className = "row"),
#         html.Div(id="output", className = "sub_page"),
#     ], className = "page"
# )])

app.config['suppress_callback_exceptions'] = True
app.layout = html.Div(id = "page-content", children = [
    html.Div([html.Div(html.H5("Features Distribution"), 
                       className="seven columns main-title")], className = "row"),
    html.Div(id = "button-area", children = [
        html.Div([
            html.Div(
                html.P("Press the button to upload your dataframe"), 
                       style = {'font-size': '22px'}, className = "row"),
            html.Br(),
            dcc.Upload(id = "upload-data", children = html.Button("Upload File", style = {'font-size': '16px'}), multiple=False)
        ], style = {
            'text-align': 'center', 
        }, className = "row")
    ]),
    html.Div(id = "subpage-table", className = 'sub_page')
], className = "page")


def parse_contents(contents, filename):
    content_type, content_string = contents.split(',')
    
    decoded = base64.b64decode(content_string)
    try:
        if 'csv' in filename:
            # Assume that the user uploaded a CSV file
            df = pd.read_csv(
                io.StringIO(decoded.decode('utf-8')))
        elif 'xls' in filename:
            # Assume that the user uploaded an excel file
            df = pd.read_excel(io.BytesIO(decoded))
    except Exception as e:
        print(e)
        return html.Div([
            'There was an error processing this file.'
        ])

    return html.Div([
        html.I(filename, style = {'font-family': 'bold', 'font-size': '20px'}),

        dash_table.DataTable(
            id = "main_table",
            style_table = {
                'width': '100%',
                'maxHeight': '600px',
                'overflowY': 'scroll'
            },
            style_as_list_view=True,
            style_header={
                'backgroundColor': 'rgb(152, 21, 27)',
                'fontWeight': 'bold',
                'text-align': 'center',
                'font-size': '20px',
                'border': '1px solid rgb(152, 21, 27)',
                'color': 'white'
             },
            style_data = {
                'text-align': 'center',
                'font-size': '18px',
                'color': 'black',
                'border': '1px solid rgb(152, 21, 27)'
            },
            style_cell={
                'maxWidth': '50px',
                'backgroundColor': 'white' 
            },
            data=df.to_dict('records'),
            columns=[{'name': i, 'id': i} for i in df.columns]
        ),

        html.Hr(),  # horizontal line
    ])

n = 0

@app.callback(Output('subpage-table', 'children'),
              [Input('upload-data', 'contents')],
              [State('upload-data', 'filename')])
def update_output(contents, name):
    if contents is not None:
        children = [parse_contents(contents, name), html.Button("Show graphics", id = "button", n_clicks = 0), 
                    html.Div(id = "graph", className = 'row')]
        return children
    


@app.callback(Output('graph', 'children'),
              [Input('main_table', 'data'),
               Input('button', 'n_clicks')]
)

def tables_output(main_table, n_clicks):
    if n_clicks == 0:
        raise PreventUpdate
    main_table = pd.DataFrame.from_dict(main_table)
    X = {col: log(data_normalization(main_table[col].astype('float'))) for col in list(main_table)}

    features_divs = [html.Div([dcc.Graph(
            figure = {
                'data': [go.Histogram(x = X[col], nbinsx = 10, histnorm='probability density', marker_color = "#98151b")],
                'layout': go.Layout(
                    hovermode = "closest",
                    autosize = True,
                    width = 600,
                    title = "Distribution of {}".format(col)
                 )
            },
            config={"displayModeBar": False},
            )], className = "row")  for i in range(20) for col in list(main_table)]
    children = [html.Div(features_divs, className = "sub_page"), 
                html.Button("Show more", id = 'button_temp', n_clicks = 0),
                html.Div(id = 'graph_temp', className = 'row')]
    
    return children

if __name__ == "__main__":
    app.run_server(debug = True)