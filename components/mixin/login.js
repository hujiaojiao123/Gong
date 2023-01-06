const LoginMixin = {
	data() {
		return {
			nickName: '',
			avatarUrl: '',
			getToken: '',
		}
	},
	onShow() {
		this.getToken = uni.getStorageSync('token');
		this.avatarUrl = uni.getStorageSync('avatarUrl') || '../../static/userCenter/weixin.png';
		this.nickName = uni.getStorageSync('nickName') || '微信用户';
	},
	methods: {
		wxLogin() {
			uni.login({
				provider: 'weixin',
				success: loginRes => {
					console.log('loginRes=====', loginRes);
					this.getIdFun(loginRes.code);
				},
				fail: err => {}
			});
		},
		// 获取用户信息
		getUserInfoFun(session_key) {
			uni.getUserInfo({
				provider: 'weixin',
				success: infoRes => {
					this.nickName = infoRes.userInfo.nickName;
					this.avatarUrl = infoRes.userInfo.avatarUrl;
					uni.setStorageSync('avatarUrl', this.avatarUrl);
					uni.setStorageSync('nickName', this.nickName);
					// console.log('infoRes====', infoRes)
					this.getPhoneResFun(session_key, infoRes.encryptedData, infoRes.iv);
				}
			});
		},
		getPhoneResFun(session_key, encryptedData, iv) {
			this.$api.getPhoneNumber({
				session_key,
				encryptedData,
				iv
			}).then((res) => {
				// console.log('res====', infoRes)
			});
		},
		getIdFun(code) {
			this.$api.getCode2seesion({
				code,
			}).then((res) => {
				if (res.token) {
					// 存储token 改变登录状态
					this.getToken = res.token
					uni.setStorageSync('token', res.token);
					this.requestSussessFun();
					this.getUserInfoFun(res.session_key);
				}
			});
		},
	},
	
}

export default LoginMixin;
