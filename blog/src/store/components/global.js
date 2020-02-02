import axios from 'axios'
import {
    Message
} from 'element-ui';

export default {
    state: {
        personalData: {},
        isShowLeftNav: false,
    },
    mutations: {
        setPersonalData(state, data) {
            state.personalData = data;
        }
    },
    actions: {
        getPersonalDataAction(context) {
            axios
                .post("/api/api/client/personal")
                .then(res => {
                    context.commit('setPersonalData', res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        updatePersonalDataAction(context, data) {
            axios
                .post("/api/api/client/personal/update", {
                    data: data
                })
                .then(res => {
                    if (res.data.code == 200) {
                        Message({
                            message: "个人信息更新成功！",
                            type: "success"
                        });
                        context.dispatch('getPersonalDataAction');
                    } else {
                        Message({
                            message: res.data.message,
                            type: "error"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    modules: {}
}