import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		chooseArr: [],
		goodsList: [],
	},
	mutations: {
		chooseArr(state, data) {
			state.chooseArr = data
		},
		goodsList(state, data) {
			state.goodsList = data
		},
	},
	actions: {
		chooseArr({commit}, data) {
			commit('chooseArr', data);
		},
		goodsList({commit}, data) {
			commit('goodsList', data);
		},
	},
	getters: {
		chooseArr: state => state.chooseArr,
		goodsList: state => state.goodsList,
	}
})
console.log(store)
export default store