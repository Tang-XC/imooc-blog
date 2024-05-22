import Vue from 'vue';
import App from './App';
import store from './store';
import MescrollBody from 'mescroll-uni/mescroll-body.vue';
import MescrollUni from 'mescroll-uni/mescroll-uni.vue';

import './uni.promisify.adaptor';
import '@/style/global.scss';

Vue.config.productionTip = false;
Vue.component('mescroll-body', MescrollBody);
Vue.component('mescroll-uni', MescrollUni);

App.mpType = 'app';

const app = new Vue({
  ...App,
  store,
});

app.$mount();
