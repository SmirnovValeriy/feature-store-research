# Tests of Vue

In this folder we are testing Vue.js library to see whether it is proper for our goals or not.

We tested three combinantions of Vue and graphs libraries: **Vue + plotly.js**, **Vue + vue-svg-charts.js** and **Vue + charts.js**. 

In the tests we upload **data.csv** (**NB**: it works **only with this table** for now) and display 100 (same) distribution graphs.

To run apps do: 
1. If it is not yet installed install **npm** and **node.js**. The simplest way to do it: \
**```sudo apt install nodejs```**
2. Install comand **serve**: \
**```npm install -g serve```**
3. Run the app (you need to be in the **vue** folder): \
**```serve -s chart```** 

To see other graphs librariies: \
in the **serve** command replace **chart** (for **charts.js** library) \
with **plotly** (for **plotly.js** library) \
or **vue-svg-charts** (for **vue-svg-charts.js** library).

In folder **src** you can find source code for the components as well.



