import { post } from '@/lib/http';
import router from '@/pages/index/router';
import adminRouter from '@/pages/admin/router.js';

export default {
	state: {
		personalData: {},
		headerDOM: {},
		navDOM: {},
		system: {},
		isAdmin: true,
		isShowLeftNav: false,
		isLogin: false,
		isPC: true,
		style: {
			pc: {
				navWidth: '17%',
				navButton: {
					width: '70px',
					height: '70px'
				},
				navAvatar: {},
				backTop: {
					position: {},
					box: {}
				}
			},
			mc: {
				navWidth: '30%',
				navButton: {
					width: '140px',
					height: '140px'
				},
				navAvatar: {
					width: '120px',
					height: '120px'
				},
				backTop: {
					position: {
						bottom: '200px'
					},
					box: {
						width: '130px',
						height: '130px'
					}
				}
			}
		},
		uid: localStorage.getItem('uid') ? localStorage.getItem('uid') : '',
		token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
		countList: {
			articleCount: '',
			CategoryCount: '',
			commentCount: ''
		},
		paging: {
			pageSize: 10,
			currentPage: 1,
			type: -1,
			total: 0,
			typeName: ''
		},
		refresh: 'main',
		UPLOADPATH: process.env.VUE_APP_UPLOADPATH
	},
	getters: {
		globalStyle: (state) => {
			if (state.isPC) {
				return state.style.pc;
			} else {
				return state.style.mc;
			}
		}
	},
	mutations: {
		isPC(state, data) {
			state.isPC = data;
		},
		setSystem(state, data) {
			//banner处理
			state.system = data;
			state.system.randomBanner = data.banner.split('\n');
			let num = Math.floor(Math.random() * state.system.randomBanner.length);
			state.system.randomBanner = state.system.randomBanner[num];
			state.system.comment_check = state.system.comment_check == 1 ? true : false;
			state.system.comment_is_allow = state.system.comment_is_allow == 1 ? true : false;
		},
		isAdmin(state, data) {
			state.isAdmin = data;
		},
		REFRESH(state, data) {
			state.refresh = data;
		},
		handleLeftNav(state, data) {
			state.isShowLeftNav = data;
		},
		setPersonalData(state, data) {
			state.personalData = data;
		},
		setLoginStatus(state, data) {
			if (data.isLogin) {
				state.isLogin = true;
				state.uid = data.uid;
				state.token = data.token;
				localStorage.setItem('uid', data.uid);
				localStorage.setItem('token', data.token);
			} else {
				state.isLogin = false;
				state.uid = undefined;
				state.token = undefined;
				localStorage.removeItem('uid');
				localStorage.removeItem('token');
			}
		},
		setCountList(state, data) {
			state.countList = data;
		},
		setPaging(state, data) {
			state.paging = data;
		},
		setHeaderDOM(state, data) {
			state.headerDOM = data;
		},
		setNavDOM(state, data) {
			state.navDOM = data;
		}
	},
	actions: {
		getPersonalDataAction(context) {
			post('/setupc/personal', {}, (data) => {
				context.commit('setPersonalData', data.data);
			});
		},
		updatePersonalDataAction(context, data) {
			post(
				'/setupc/updatePersonal',
				{
					data: data
				},
				(data) => {
					context.dispatch('getPersonalDataAction');
				}
			);
		},
		loginAction(context, data) {
			post(
				'/login',
				{
					name: data.name,
					password: data.password
				},
				(data) => {
					if (data.code == 200) {
						context.commit('setLoginStatus', {
							isLogin: true,
							uid: data.data.uid,
							token: data.data.token
						});
						adminRouter.push('/admin');
					}
				}
			);
		},
		alterPassAction(context, data) {
			post(
				'/login/alterpass',
				{
					password: data.password,
					repassword: data.repassword
				},
				(data) => {}
			);
		},
		logoutAction(context, data) {
			post('/login/logout', {}, (data) => {
				adminRouter.push('/admin/login');
				context.commit('setLoginStatus', {
					isLogin: false
				});
			});
		},
		getCountAction(context, data) {
			post('/setupc/count', {}, (res) => {
				context.commit('setCountList', res.data);
			});
		},
		getSystemAciton(context, data) {
			post('/setupc/system', {}, (res) => {
				context.commit('setSystem', res.data);
			});
		},
		updateSystemAciton(context, data) {
			post(
				'/setupc/updateSystem',
				{
					data: data
				},
				(res) => {
					context.dispatch('getSystemAciton');
				}
			);
		}
	},
	modules: {}
};
