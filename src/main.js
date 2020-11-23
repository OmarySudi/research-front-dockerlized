import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import store from './store'
import TokenService from './services/storage'
import ApiService from '@/services/api'
import vuetify from './plugins/vuetify';
import 'jquery';
import 'popper.js';
import 'bootstrap';
import './assets/app.scss';

//ApiService.init('/rapp/api/v1');
ApiService.init('http://41.93.71.70:8005/api/v1');
//ApiService.init('http://localhost:8005/api/v1');

require('@/store/subscriber')

Vue.config.productionTip = false
Vue.use(Vuelidate)

ApiService.mount401Interceptor()

store.dispatch('attempt',TokenService.getToken()).then(()=>{

  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')

});
 

