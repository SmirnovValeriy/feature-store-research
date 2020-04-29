import Vue from 'vue';
import App from './Chartjs.vue'; 
Vue.config.productionTip = false;
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)



require('@/assets/base2.css');
require('@/assets/index.css');
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount('#app')
