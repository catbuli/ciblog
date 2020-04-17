import Vue from 'vue'
import admin from './admin.vue'
import router from './router.js'
import store from '@/lib/store'
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/iconfont/iconfont.css";
import {
    post,
    test
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
    Message,
    MessageBox,
    Tree
} from 'element-ui';
Vue.use(Image);
Vue.use(Tree);
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
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$post = post;

Vue.config.productionTip = false
console.log(`%c当前访问为admin应用`, 'padding:5px 10px;color:white;background-color:orange');
console.log(`%c${process.env.VUE_APP_MESSAGE}`, 'padding:5px 10px;color:white;background-color:orange');
console.log(`%c${process.env.VUE_APP_VERSION}`, 'padding:5px 10px;color:white;background-color:green');
new Vue({
    router,
    store,
    render: h => h(admin)
}).$mount('#admin')