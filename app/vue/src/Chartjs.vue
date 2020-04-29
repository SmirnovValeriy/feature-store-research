//HTML template for this component
<template>
  <div class = "application" id="app">
      <div>
          <div class="header">Data Quality Evaluation</div>
          <div class = "rowrow" style = "width: 65%">
              <b-alert variant = "success"  style="border-radius: 8px; display: flex" show dismissible>
                  <div class="subheader_bold"> Hey! </div>
                  <div class ="subheader"> Here you can see results of data quality evluation </div>
              </b-alert>
          </div>
          <div style = "text-align: center">
              <button class = "sort" v-if="SortedWorst" @click="SortBest">
                  <b-icon icon="graph-down" aria-hidden="true"></b-icon>
                  Show the best features first
              </button>
              <button class = "sort" v-else @click="SortWorst">
                  <b-icon icon="graph-down" aria-hidden="true"></b-icon>
                  Show the worst features first
              </button>
          </div>
          <div class = "rowrow">
              <ul/>
              <hr>
              <div class = "rowrow2" v-for="(item, index) in features" v-bind:key="index">
                  <feature
                          :name="item['name']"
                          :hist="item['hist']"
                          :months_hist="item['months_hist']"
                          :months_names="['April', 'May', 'June', 'July', 'August', 'September',
                          'October', 'November', 'December', 'January', 'February']"
                          :pvalue_dist="item['distribution_stability']"
                          :pvalue_er="item['event_rate_stability']"
                          :pvalues_dist="item['p_values_distribution']"
                          :pvalues_er="item['p_values_event_rate']"
                          :months_count="item['month_count']"
                  />
                  <br>
              </div>
              <ul/>
              <button @click = "printMessage"> SHOW MORE </button>
              <div class = "upload" v-if="printMsg">
                <div v-for="feat in features" v-bind:key = "feat.name">
                    {{feat.name}}
                </div>
              </div>
          </div>
          <div v-if="false">
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

import 'chart.js';
import 'hchs-vue-charts';
import Vue from 'vue';
Vue.use(window.VueCharts);
import axios from 'axios';
import Feature from './components/Feature.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './customStyle.css';
//main component
export default{
  name: "App",
  data() {
    return {
      csvData: [],
      nbins: 20,
      files: [],
      columns: [],
      features: [],
      printMsg: false,
        SortedWorst: false,
    }
  },
  computed: {
    forTable: {
      get: function() {
        return this.csvData.slice(10);
      }
    },
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
    },
    uploadDisabled() {
      return this.files.length === 0;
    }
  },
  methods: {
    //parse CSV user chose
    parseFile: function(e) {
      var Papa = require("papaparse/papaparse.min.js");
      Papa.parse(e.target.files[0], {
        header: true,
        download: true,
        skipEmptyLines: true,
        complete: results => {
          console.log(results);
          this.csvData = results.data;
          console.log(this.csvData);
          Object.keys(this.csvData[0]).map(d => {this.columns.push({id: d, name: d})});
        }
      });
    },
    addFileDrop(e) {
      let droppedFiles = e.dataTransfer.files;
      if(!droppedFiles) return;
      ([...droppedFiles]).forEach(f => {
          this.files.push(f);
      });
    },
    getMessage() {
        const path = 'http://localhost:5000/data_quality';
        axios.get(path)
        .then((res) => {
          this.features = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    printMessage() {
        this.printMsg = true;
    },
      SortBest() {
          this.features.sort(function (a, b) {
              console.log(a);
              if(a['distribution_stability'] > b['distribution_stability']) return -1;
              else return 1;
          });
          console.log(this.features);
          this.SortedWorst = false;
      },
      SortWorst() {
          this.features.sort(function (firstEl, secondEl) {
              if(firstEl['distribution_stability'] < secondEl['distribution_stability']) return -1;
              else return 1;
          });
          console.log(this.features[0]);
          this.SortedWorst = true;
      }
  },
    components: {
        'feature': Feature
    },
    created() {
        this.getMessage();
    }
}
</script>

<style>
</style>