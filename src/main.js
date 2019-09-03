import Vue from 'vue';
import BaiduMap from 'vue-baidu-map';
import ElementUI from 'element-ui';
import router from './router/router';
import './assets/css/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/icomm/style.css';


import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(BaiduMap, {
    ack: '3cGg6TuIugMUajCWcVPObvGlyjDfxgGG',
});
Vue.use(ElementUI);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');