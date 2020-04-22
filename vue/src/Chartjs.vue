//HTML template for this component
<template>
  <div class ="page" id="app">
      <div class = "sub_page">
          <h5> Test Vue.js + charts.js</h5>
          <div class = "rowrow">
              <img alt="Vue logo" src="./assets/logo.png">
          </div>
          <div class = "rowrow">
              <input type="file" @change="parseFile" multiple>
          </div>
          <div v-if="histogram[0]">
            <div v-for="i in 100" :key = "i">
              <div class = "rowrow">
                <hr>
                <h6> CNT_CHILDREN Distribution </h6>
                <chartjs-bar 
                  :data="histogram"
                  :labels="labels"
                />
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>

//counting histogram bins function
function histogram(data, nbins) {
  if (nbins <= 0) throw Error("Wrong number of bins");
  var min = data[0];
  var max = data[1];
  var length = data.length;

  for(var i = 2; i < length; i++) {
    var current = data[i];
    if (current < min) min = current;
    if (current > max) max = current;
  }

  var histogram = Array(nbins).fill(0);
  var step = (max - min) / nbins;
  for(var j = 0; j < length; j++) {
    if (data[j] == max) histogram[nbins - 1]++;
    else histogram[Math.floor((data[j] - min) / step)]++;
  }
  return histogram;
}

require('@/assets/base.css');
require('@/assets/base2.css');
require('@/assets/styles.css');
require('@/assets/index.css');

import 'chart.js';
import 'hchs-vue-charts';
import Vue from 'vue';
Vue.use(window.VueCharts);

//main component
export default{
  name: "App",
  data() {
    return {
      csvData: [],
      nbins: 10
    }
  },
  computed: {
    histogram: {
      get: function() {
        console.log("here");
        const bins = this.nbins;
        const data = this.csvData;
        return histogram(data.map(d => +d['CNT_CHILDREN']), bins); 
      }
    },
    labels: {
      get: function() {
        const bins = this.nbins;
        return Array(bins).fill(0).map( (value, key) => { return key; });
      }
    } 
  },
  methods: {
    //parse CSV user chose
    parseFile: function(event) {
      var Papa = require("papaparse/papaparse.min.js");
      Papa.parse(event.target.files[0], {
        header: true,
        download: true,
        skipEmptyLines: true,
        complete: results => {
          console.log(results);
          this.csvData = results.data;
        }
      });
    }
  }
}
</script>

