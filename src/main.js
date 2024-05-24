import Vue from 'vue';
import App from './App';
import store from './store';
import MescrollBody from 'mescroll-uni/mescroll-body.vue';
import MescrollUni from 'mescroll-uni/mescroll-uni.vue';
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html';

import './uni.promisify.adaptor';
import '@/style/global.scss';

Vue.config.productionTip = false;
Vue.component('mescroll-body', MescrollBody);
Vue.component('mescroll-uni', MescrollUni);
Vue.component('mp-html', mpHtml);

App.mpType = 'app';

const app = new Vue({
  ...App,
  store,
});

app.$mount();
