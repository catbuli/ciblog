import axios from 'axios'

export default {
    state: {
        personalData: {}
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
        }
    },
    modules: {}
}