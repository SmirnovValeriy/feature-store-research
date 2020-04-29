import pandas
import json
from flask import Flask, jsonify
from flask_cors import CORS

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


# sanity check route
@app.route('/data_quality', methods=['GET'])
def data_quality():
    with open("./data/data_quality.json", "r") as read_file:
        data = json.load(read_file)
    return jsonify(data)


if __name__ == '__main__':
    app.run()
