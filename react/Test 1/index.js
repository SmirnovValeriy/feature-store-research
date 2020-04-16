import React, { useState, useEffect, Component } from 'react';
import Plot from 'react-plotly.js';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './base.css';
import './base2.css';
import './styles.css';
import './index.css';
import { CSVReader } from 'react-papaparse'


export default class DataParser extends Component {
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
    this.setState({data: data}); // or shorter ES syntax: this.setState({ data });
  }
  
  render() {
    console.log(this.state.data);
    const data = this.state.data;
    if (data[0] ) return (
                <div className = "page">
                    <div className = "sub_page">
                        <h5> Test React.js + Plotly.js </h5>
                        {Array(30).fill(0).map( function(value, key) { return <Plot data = {[{x: data.map(function(value, key) { return +value['CNT_CHILDREN']; }), 
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

// ========================================

ReactDOM.render(
  <DataParser />,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
