import Vue from 'vue';
import App from './Chartjs.vue'; //you may choose './VueSvgCharts.vue' and './Plotly.vue' as well
Vue.config.productionTip = false;

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount('#app')
