import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from '@/lib/store'
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/iconfont/iconfont.css";
import {
    post
} from '@/lib/http'
import {
    Input,
    Form,
    FormItem,
    Row,
    Col,
    Avatar,
    Pagination,
    Loading,
    Popover,
    Button
} from 'element-ui';

Vue.config.productionTip = false
Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Avatar);
Vue.use(Pagination);
Vue.use(Pagination);
Vue.use(Loading);
Vue.use(Popover);
Vue.prototype.$post = post;
console.log(`%c当前访问为index应用`, 'padding:5px 10px;color:white;background-color:orange');
console.log(`%c${process.env.VUE_APP_MESSAGE}`, 'padding:5px 10px;color:white;background-color:orange');
console.log(`%c${process.env.VUE_APP_VERSION}`, 'padding:5px 10px;color:white;background-color:green');
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
// import "./assets/styles/markdown.css"
// import JQuery from '@/commonFunction/jquery.min.js'
// import viewClickAnimation from '@/commonFunction/viewClickAnimation.js'
// const originalPush = router.prototype.push
// router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }