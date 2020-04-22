import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import Chart from 'chart.js'
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './assets/base.css';
import './assets/base2.css';
import './assets/styles.css';
import './assets/index.css';

//Plotly.js
class Plotly extends Component {
    constructor(props) {
    super(props);
    this.state = {
        data: [],
    };
    this.updateData = this.updateData.bind(this);
  }
  
  componentWillMount() {

    var csvFilePath = require("./data.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData
    });
  }

  updateData(result) {
    const data = result.data;
    this.setState({data: data});
  }
  
  render() {
    console.log(this.state.data);
    const data = this.state.data;
    if (data[0]) return (
                <div className = "page">
                    <div className = "sub_page">
                        <h5> Test React.js + Plotly.js </h5>
                        {Array(100).fill(0).map( function(value, key) { return <Plot data = {[{x: data.map(function(value, key) { return +value['CNT_CHILDREN']; }), 
                        marker: {color: "#98151b"}, type: 'histogram'}]} 
                        layout = { {width: '100%', height: 400, title: "CNT_CHILDREN Distribution"} }/>; })}
                    </div>
                </div>);
    else return (
        <div className = "page">
            <div className = "sub_page">
            <h5> Test React.js + Plotly.js </h5>
            </div>
        </div>);
  }
};

// =====================================================

//Charts.js
class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.datasets[0].data = this.props.data;
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'bar',
      data: {
	labels: this.props.labels,
        datasets: [{
          label: this.props.title,
          data: this.props.data,
          backgroundColor: this.props.color
        }]
      }
    });
  }

  render() {
    return (
        <canvas ref={this.canvasRef} />
    );
  }
}

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
        histogram[Math.floor((data[j] - min) / step)]++;
    }
    return histogram;
}

// Canvas based graphs
class Chartsjs extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
        data: [],
    };
    this.updateData = this.updateData.bind(this);
  }
  
  componentWillMount() {
    var csvFilePath = require("./data.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData
    });
  }

  updateData(result) {
    const data = result.data;
    this.setState({data: data});
  }
  
  render() {
    const data = this.state.data;
    console.log(data);
    const nbins = 25;
    if (data[0]) return (
                <div className = "page">
                    <div className = "sub_page">
                        <h5> Test React.js + Chart.js </h5>
                        {Array(100).fill(0).map( function(value, key) {
			 return <BarChart 
				labels = {Array(nbins).fill('0')}
				title =  {"CNT_CHILDREN Distribution"}
				data = {histogram(data.map(d => +d['CNT_CHILDREN']), nbins)} 
                        	color = {"#98151b"}/>;} )}
                    </div>
                </div>);
    else return (
        <div className = "page">
            <div className = "sub_page">
            <h5> Test React.js + Chart.js </h5>
            </div>
        </div>);
  }
}


ReactDOM.render(
  <Chartsjs />,
  document.getElementById("root")
);

serviceWorker.unregister();
