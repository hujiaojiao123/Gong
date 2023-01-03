export const baseURL = 'http://www.gong-official.com/';
 
// export const baseURL = 'http://test.gong-official.com/';
export const request = (options) => {
	let url = options.url;
	let method = options.method.toUpperCase();
	let header = options.header || {};
	let data = Object.assign(options.data || {});
	let hideLoading = options.hideLoading || false;
	//拼接完整请求地址
	let requestUrl = baseURL + options.url;
	if (method == "POST") {
		header = Object.assign({
		  'content-type': "application/json"
		}, options.header, {
		  'Authorization': 'Bearer ' + uni.getStorageSync("token")
		});	
	} else {
		header = Object.assign({
		  'content-type': "application/json"
		}, options.header, {
		  'Authorization': 'Bearer ' + uni.getStorageSync("token")
		});
	}
	
	 if(options.loadingText){
		uni.showLoading({
			title: options.loadingText
		});   
	}
	
	return new Promise((resolve, reject) => {
		uni.request({
			url: requestUrl, //接口地址：前缀+方法中传入的地址
			method, //请求方法：传入的方法或者默认是“GET”
			data, //传递参数：传入的参数或者默认传递空集合
			header,
			success: (res) => {
				// console.log(res, uni.getStorageSync('token'));
				//返回的数据（不固定，看后端接口，这里是做了一个判断，如果不为true，用uni.showToast方法提示获取数据失败)
				uni.hideLoading();
				if (res.data.code == 0) {
					resolve(res.data.data);
				} else {
					uni.showToast({ title: res.data.msg, icon:'none' });
					reject(res.data.msg)
				}
				// 如果不满足上述判断就输出数据
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败
			fail: (err) => {
				uni.showToast({ title: err.errMsg, icon:'none' });
				reject(err)
			}
		})
	})
}