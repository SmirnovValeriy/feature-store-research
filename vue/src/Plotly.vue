//HTML template for this component
<template>
  <div class ="page" id="app">
      <div class = "sub_page">
          <h5> Test Vue.js + plotly.js</h5>
          <div class = "rowrow">
              <img alt="Vue logo" src="./assets/Valeriy.png">
          </div>
          <div class = "rowrow">
              <div class = dash v-cloak @drop.prevent="parseFile" @dragover.prevent>
                  <ul/>
                  <div class="upload"> Drop or
                    <button class = "upload-btn-wrapper">
                        Select files
                        <div>
                            <input type = "file" @change="parseFile">
                        </div>
                    </button>
                    <ul/>
                  </div>
              </div>
              <ul/>
          </div>
          <div v-if="histogram[0].y[0]"> //check if data for graphs appears
            <div v-for="i in 100" :key = "i">
              <div class = "rowrow">
                <hr>
                <h6>  </h6>
                <Plotly
                  :data="histogram"
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

import {Plotly} from 'vue-plotly';
//main component
export default{
  name: "App",
  data() {
    return {
      csvData: [],
      nbins = 20
    }
  },
  computed: {
    histogram: {
      get: function() {
        const bins = this.nbins;
        const data = this.csvData;
        const yData = histogram(data.map(d => +d['CNT_CHILDREN']), bins);
        return [{
                y: yData,
                type:"bar"
               }]
      }
    },
    labels: {
      get: function() {
        const bins = this.nbins;
        return Array(bins).fill(0).map( (value, key) => { return key.toString(); });
      }
    } 
  },
  components: {
    Plotly
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

