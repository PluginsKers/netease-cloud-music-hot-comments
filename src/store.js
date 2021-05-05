import Vue from 'vue';
import Vuex from 'vuex';
import request from './request';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		logged: localStorage.getItem('_c') ? true : false,
		cookie: localStorage.getItem('_c') ? JSON.parse(localStorage.getItem('_c')) : null,
		profile: {},
		token: null,
	},
	mutations: {
		logout(state) {
			state.logged = false;
			state.cookie = null;
			localStorage.setItem('_c', null);
		},
	},
	actions: {
		login(state, obj) {
			if (this.state.logged) {
				router.push('/');
				return Qmsg['warning']('您已经登录了');
			}
			switch (obj.type) {
				case "phone":
					if (obj.data) {
						request({
							url: '/login/cellphone',
							data: {
								phone: obj.data.phone,
								password: obj.data.password
							}
						}).then((response) => {
							if (response.data && response.data.code == 200) {
								this.state.cookie = response.data.cookie;
								localStorage.setItem('_c', JSON.stringify(response.data.cookie));
								this.state.profile = response.data.profile;
								this.state.token = response.data.token;
								this.state.logged = true;
								router.push('/');
								Qmsg['success']('登录成功');
							} else {
								Qmsg['success']('登录失败-1');
							}
						});
					} else {
						Qmsg['error']("登录失败-2");
					}
					break;

				case "email":
					if (obj.data) {
						request({
							url: '/login',
							data: {
								email: obj.data.email,
								password: obj.data.password
							}
						}).then((response) => {
							if (response.data && response.data.code == 200) {
								this.state.cookie = response.data.cookie;
								localStorage.setItem('_c', JSON.stringify(response.data.cookie));
								this.state.logged = true;
								router.push('/');
								Qmsg['success']('登录成功');
							} else {
								Qmsg['success']('登录失败-1');
							}
						});
					} else {
						Qmsg['error']('登录失败-2');
					}
					break;
				case 'qr':
					Qmsg['error']('开发中');
					break;
				default:
					Qmsg['error']('参数错误');
					break;
			}
		}
	}
})
