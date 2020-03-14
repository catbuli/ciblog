import Vue from 'vue'
import admin from '@/admin/admin.vue'
import router from '@/admin/router'
import store from '@/store'
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/iconfont/iconfont.css";
import {
    post
} from '@/lib/http'
// import "./assets/styles/markdown.css"
// import JQuery from '@/commonFunction/jquery.min.js'
// import viewClickAnimation from '@/commonFunction/viewClickAnimation.js'
// const originalPush = router.prototype.push
// router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$post = post;
console.log('当前为admin应用', '')
console.log(process.env.VUE_APP_URL);
console.log(process.env.VUE_APP_MESSAGE);
new Vue({
    router,
    store,
    render: h => h(admin)
}).$mount('#admin')