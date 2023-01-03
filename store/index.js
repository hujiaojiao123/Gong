import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		chooseArr: [],
	},
	mutations: {
		chooseArr(state, data) {
			state.chooseArr = data
		},
	},
	actions: {
		chooseArr({commit}, data) {
			commit('chooseArr', data);
		},
	},
	getters: {
		chooseArr: state => state.chooseArr,
	}
})
console.log(store)
export default store