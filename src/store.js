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
			let keys = document.cookie.match(/[^ =;]+(?==)/g);
			if (keys) {
				for (let i = keys.length; i--;) {
					document.cookie =
						keys[i] + "=0;path=/;expires=" + new Date(0).toUTCString();
					document.cookie =
						keys[i] +
						"=0;path=/;domain=" +
						document.domain +
						";expires=" +
						new Date(0).toUTCString();
				}
			}
			this.state.logged = false;
			this.state.cookie = null;
			localStorage.setItem('_c', '');
			router.push('/login');
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
					if (obj.data.data) {
						this.state.cookie = obj.data.data.cookie;
						localStorage.setItem('_c', JSON.stringify(obj.data.data.cookie));
						this.state.logged = true;
						router.push('/');
						Qmsg['success']('登录成功');
					} else {
						Qmsg['success']('登录失败-1');
					}
					break;
				default:
					Qmsg['error']('参数错误');
					break;
			}
		}
	}
})
