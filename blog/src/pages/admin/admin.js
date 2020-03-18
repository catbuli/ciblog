import Vue from 'vue'
import admin from './admin.vue'
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
    Button,
    Menu,
    MenuItem,
    Submenu,
    DatePicker,
    Checkbox,
    CheckboxGroup,
    Upload,
    Dialog,
    Switch,
    Select,
    Table,
    TableColumn,
    Option,
    Badge,
    RadioGroup,
    RadioButton,
    Radio,
    Tag,
    Image,
    Notification,
    Message
} from 'element-ui';
Vue.use(Image);
Vue.use(Tag);
Vue.use(Radio);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Option);
Vue.use(Badge);
Vue.use(Select);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(CheckboxGroup);
Vue.use(Dialog);
Vue.use(Upload);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Menu);
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
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$post = post;
Vue.config.productionTip = false
console.log('当前为admin应用', '')
console.log(process.env.VUE_APP_URL);
console.log(process.env.VUE_APP_MESSAGE);
new Vue({
    router,
    store,
    render: h => h(admin)
}).$mount('#admin')