import Vue from 'vue'
import App from '@/App.vue'
import router from '@/lib/router'
import store from '@/store'
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import "./assets/styles/iconfont/iconfont.css";
import {
    post
} from '@/lib/http'
// import "./assets/styles/markdown.css"
// import JQuery from '@/commonFunction/jquery.min.js'
// import viewClickAnimation from '@/commonFunction/viewClickAnimation.js'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$post = post;
console.log(process.env.VUE_APP_URL);
console.log(process.env.VUE_APP_MESSAGE);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')