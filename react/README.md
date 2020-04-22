# Tests of React

In this folder we are testing React.js library to see whether it is proper for our goals or not.

We tested two combinantions of react and graphs libraries: **React + plotly.js** and **React + charts.js**. 

In the tests we upload **data.csv** (**NB**: it works only with this table for now) and display 100 (same) distribution graphs.

To switch between graphs libraries in **src/index.js** replace: \
**```ReactDOM.render(<Chartsjs />, document.getElementById("root"));```** (for **charts.js** library) \
with: \
**```ReactDOM.render(<Plotly />, document.getElementById("root"));```** (for **plotly.js** library).

To run apps do: 
1. Install the latest version of **[node.js](https://nodejs.org/en/)**.
2. Choose folder for the React app: \
**```$ mkdir react```** 
3. Install **npx**: \
**```$ sudo npm install -g npx```** 
4. Inside the folder create the React app: \
**```$ npx create-react-app my-app```** 
5. If everything went fine, replace folders **public** and **src** with relevant folders from this repository.
6. You need also to install extra libraries: \
**```$ cd my-app```** \
**```$ npm install papaparse```** \
**```$ npm install react-plotly.js plotly.js```** \
**```$ npm install chart.js```** 
7. And finally start the app: \
**```$ npm start```**

