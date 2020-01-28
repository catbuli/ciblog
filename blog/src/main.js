import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Mock from '@/mock'
import Axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/styles/iconfont/iconfont.css"
// import JQuery from '@/commonFunction/jquery.min.js'
// import viewClickAnimation from '@/commonFunction/viewClickAnimation.js'

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
    // Mock,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
// Vue.prototype.Axios = Axios