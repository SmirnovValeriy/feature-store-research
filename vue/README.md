# Tests of Vue

In this folder we are testing Vue.js library to see whether it is proper for our goals or not.

We tested three combinantions of Vue and graphs libraries: **Vue + plotly.js**, **Vue + vue-svg-charts.js** and **Vue + charts.js**. 

In the tests we upload **data.csv** (**NB**: it works only with this table for now) and display 100 (same) distribution graphs.

To switch between graphs libraries in **src/main.js** replace \
**```import App from './Chartjs.vue'```** (for **charts.js** library) \
with **```import App from './VueSvgCharts.vue'```** (for **vue-svg-charts.js** library) \
or **```import App from './Plotly.vue'```** (for **plotly.js library**).

To run apps do: 
1. Install the latest version of **[node.js](https://nodejs.org/en/)**.
2. Install **vue/cli**: \
**```$ sudo npm install -g @vue/cli```** 
3. Choose folder for the Vue app: \
**```$ mkdir vue```** 
4. Inside the folder create the Vue app: \
**```$ vue create my-project```** 
5. If everything went fine, replace folders **public** and **src** with relevant folders from this repository.
6. You need also to install extra libraries: \
**```$ cd my-project```** \
**```$ npm install papaparse```** \
**```$ npm install vue-svg-charts```** \
**```$ npm install chart.js chartkick hchs-vue-charts vue-chartjs vue-chartkick```** \
**```$ npm install vue-plotly```** 
6. And finally start the app: \
**```$ npm run serve```**
