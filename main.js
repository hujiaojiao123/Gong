import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import api from './api/index.js';
import Store from './store'
Vue.prototype.$api = api;
Vue.prototype.$store=Store;
Vue.config.productionTip = false
App.mpType = 'app'


const app = new Vue({
	Store,
	...App
})
app.$mount()
// #endif


// #ifdef VUE3
import {createSSRApp} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	return {app}
}
// #endif
